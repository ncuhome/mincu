import { existsSync, readFileSync, promises as pfs } from 'fs';
import pacote, { Options } from 'pacote'
import { join } from 'path';
import Module from 'module'

interface LazyLock {
  [key: string]: string
}

export class LazyModule {
  installed: Map<string, string>

  #root: string;
  #module: Module
  #preferLock: boolean
  #lockfile: string
  #pacoteOptions?: Options

  constructor({
    cwd = process.cwd(),
    rootPath = './mincu-lazy-modules',
    preferLock = true,
    pacoteOptions = undefined
  }) {
    this.installed = new Map()

    this.#root = join(cwd, rootPath, './node_modules');
    this.#preferLock = preferLock
    this.#pacoteOptions = pacoteOptions

    if (preferLock) {
      this.#lockfile = join(cwd, rootPath, './layz-lock.json')
      this.#loadLock()
    }

    this.#module = new Module('', null)
    this.#module.paths = [this.#root]
  }

  #loadLock() {
    if (existsSync(this.#lockfile)) {
      const lockJson = JSON.parse(readFileSync(this.#lockfile).toString()) as LazyLock
      for (const [pkg, version] of Object.entries(lockJson)) {
        this.installed.set(pkg, version)
      }
    }
  }

  async #writeLock() {
    if (!this.#preferLock) return
    const data = {}
    Array.from(this.installed.entries()).forEach(([pkg, version]) => {
      data[pkg] = version
    })
    return pfs.writeFile(this.#lockfile, JSON.stringify(data, null, 2), 'utf-8')
  }

  #moduleName(name: string, version?: string) {
    return version ? `${name}@${version}` : name
  }

  #dest(name: string) {
    return join(this.#root, './', name)
  }

  async #install(name: string, version?: string) {
    const fetchList = []
    if (!this.installed.has(name)) {
      const module = this.#moduleName(name, version)
      const { dependencies, version: remoteVersion } = await pacote.manifest(module, this.#pacoteOptions)
      this.installed.set(name, remoteVersion)
      if (dependencies) {
        for (const [pkg, version] of Object.entries(dependencies)) {
          if (!this.installed.has(pkg)) {
            fetchList.push(this.#install(pkg, version))
            this.installed.set(pkg, version)
          }
        }
      }
      fetchList.push(pacote.extract(this.#moduleName(name, version), this.#dest(name), this.#pacoteOptions))
    }
    return Promise.all(fetchList)
  }

  async install(name: string, version?: string) {
    await this.#install(name, version)
    return this.#writeLock()
  }

  require(name: string) {
    try {
      const required = this.#module.require(name)
      return required
    } catch (err) {
      console.error(err)
      return undefined
    }
  }

  async installAndRequire(name: string, version?: string) {
    await this.install(name, version)
    return this.require(name)
  }
}