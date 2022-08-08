<script setup lang="ts">
import QrcodeVue from 'qrcode.vue'
const getPreviewUrl = () => {
  return location.href + '?devSecret=iNCUDeveloper++';
};
</script>

<template>
  <div className="flex flex-col justify-center items-center h-screen text-sm md:text-lg">
    <div className="mb-8">请使用南大家园扫描以下二维码，即刻预览 🚀</div>
    <qrcode-vue :value="getPreviewUrl()" size="180" />

    <span className="mt-8">
      <span className="opacity-60">还没有安装南大家园？</span>
      <a
        target="_blank"
        href="http://incu.ncuos.com/"
        className="text-blue-600 dark:text-blue-500 hover:underline opacity-60 hover:opacity-100"
      >
        前往下载
      </a>
    </span>
  </div>
</template>