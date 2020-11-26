declare namespace Navigation {
  type StackParamList = {
    新特性
    登录: { loginError: boolean | undefined; message: string | undefined }
    首页: { url: string }
    周课表
    课程详情: { id: string }
    编辑课程: { course: CourseType.ILesson }
    添加课程: { initialPage: number, lessonTime?: string }
    忘记密码
    重置密码: { studentId: string; verifyCode: string }
    验证码提示
    习惯圈子
    习惯推荐: { article: IArticle }
    创建习惯: {
      habitName?: string
      habit?: IHabit
      onSave?: (habit: IHabit) => void
    }
    搜索习惯
    习惯成员: {
      title?: string
      habit: IHabit
      onUserPress?: (user: IRank) => void
    }
    记录一下: {
      task?: IHabit
      onPost?: (record: IRecord) => void
      onAfterPost?: () => void
    }
    习惯详情: { task?: any; taskId?: string }
    事项详情: { id: string }
    添加事项: { startTime: string }
    记录详情: { record?: any; onPostComment?: (IComment) => void }
    Webview: {
      url: string
      title?: string
      icon?: string
      autoTitle?: boolean
    }
    用户资料: { userId: string }
    活动详情: { activity: IActivity }
    地点详情: {
      address: string
      activities: IActivity[]
    }
    主教空闲教室
    失物招领
    失物招领详情页面: { id: string; title: string; summary: string; addMode?: boolean }
    失物招领添加
    失物招领编辑: { id: string; userID: string; summary: string; place: string; title: string }
    失物招领聊天: {
      id: string
      nick: string
      ownerMode?: boolean
      reset?: any
      title?: string
      fetchData?: any
    }

    消费记录
    成绩查询
    用电查询

    用户设置
    关于我们: { showAppIntro?: boolean }
    账号管理
    绑定双学位: { onBindSuccess }
    绑定医学院学号: { onBindSuccess }
    我的消息
    项目成员: { itemId: number; itemName: string }

    南大图书
    图书详情: { data: BooksDetailState }
    南大图书搜索

    设置

    列表页: {
      title?: string
      data?: any[]
      renderItem?: (item: any, index: number) => React.ReactElement<any>
      heightForItem?: (item: any, index: number) => number
      numColumns?: number
    }

    校园地图
    打卡记录
  }
  type TabParamList = {
    今日
    习惯
    生活
    我的
  }
}

interface IRecord extends IRecordID {
  name: string
  avatar: string
  department: string
  content: string
  date: number
  like_count: number
  like_user: {
    id: string
    name: string
  }[]
  is_like: boolean
  topic: string
  userId: string
  reply_count?: number
  comments: IComment[]
  images?: string[] | ImageURISource[]
  todo?: IHabit
}

interface IRecordID {
  id: string
  todoId: string
}

interface IArticle {
  id: string
  banner?: boolean
  order?: number
  title: string
  subtitle: string
  show?: boolean
  style: 'black' | 'white'
  image: string
  content?: string
  date: number
}

interface IHabit {
  id: string
  type: TaskType
  title: string
  content: string
  history?: number[]
  rank?: string
  last?: number
  count?: number
  join: boolean
  createUser: string
  is_checked?: boolean
  check_count?: number
  color: string
  auth?: AuthType
}

interface IActivity {
  id: number
  address_id: number
  desc: string
  hosts: string
  name: string
  address: string
  end_time: string
  status: number
  start_time: string
  type: string
  is_lover: boolean
  lovers: number
}
