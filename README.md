# React + MongoDB + Netlify Serverless

一个基于 React 前端 + MongoDB 数据库 + Netlify Serverless Functions 的全栈 Web 应用，支持文章发布、留言板等功能。

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端框架 | React 19 + React Router 7 |
| UI 组件库 | Ant Design 5 |
| 状态管理 | Redux Toolkit |
| 样式 | SCSS + Bootstrap 5 |
| 构建工具 | Vite |
| 后端 | Netlify Serverless Functions |
| 数据库 | MongoDB Atlas (Mongoose) |
| 部署 | Netlify |

## 项目结构

```
react-mongodb-netlify/
├── functions/                  # Netlify Serverless Functions
│   ├── db.js                   # MongoDB 连接与 Schema 定义
│   ├── utils/
│   │   └── response.js         # 统一响应与错误处理工具
│   ├── postAll.js              # GET /api/postAll - 获取所有文章
│   ├── postContent.js          # POST /api/postContent - 创建文章
│   └── getById.js              # GET /api/getById?id=xxx - 获取单篇文章
├── src/
│   ├── index.js                # 应用入口
│   ├── App.js                  # 路由配置
│   ├── components/             # 通用组件
│   │   ├── Input/
│   │   └── Radio/
│   ├── pages/                  # 页面组件
│   │   ├── home/               # 首页 - 文章列表
│   │   ├── messageBoard/       # 留言板
│   │   ├── posts/              # 文章详情
│   │   ├── Form/               # 动态表单
│   │   └── Top/                # 顶部导航
│   └── store/                  # Redux 状态管理
│       ├── index.js
│       ├── action-types.js
│       ├── actions/
│       └── reducers/
├── public/                     # 静态资源
├── netlify.toml                # Netlify 配置
├── vite.config.js              # Vite 构建配置
├── .env.example                # 环境变量模板
└── package.json
```

## 快速开始

### 前置要求

- Node.js >= 18
- npm >= 9
- MongoDB Atlas 账号（或本地 MongoDB 实例）

### 安装

```bash
git clone <repo-url>
cd react-mongodb-netlify
npm install
```

### 环境变量配置

复制 `.env.example` 为 `.env`，填入你的 MongoDB 连接字符串：

```bash
cp .env.example .env
```

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
```

### 本地开发

```bash
# 启动前端开发服务器
npm run dev

# 使用 Netlify CLI 启动（含 Serverless Functions）
npx netlify dev
```

### 构建

```bash
npm run build
```

## Netlify 部署

1. 将项目推送到 GitHub
2. 在 [Netlify](https://app.netlify.com) 中导入项目
3. 在 **Site settings > Environment variables** 中设置 `MONGODB_URI`
4. 确保 MongoDB Atlas 的 **Network Access** 中添加 `0.0.0.0/0`（允许所有 IP）
5. 部署会自动触发

### netlify.toml 配置说明

- `publish = "build"` — 前端构建产物目录
- `functions = "functions"` — Serverless Functions 目录
- `/api/*` 请求会被重定向到对应的 Serverless Function

## API 接口文档

所有接口通过 `/api/*` 路径访问，由 Netlify 重定向到 Serverless Functions。

### GET /api/postAll

获取所有文章列表，支持分页。

**查询参数：**
| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| page | number | 1 | 页码 |
| limit | number | 20 | 每页数量 |

**响应：**
```json
{
  "data": [...],
  "pagination": { "page": 1, "limit": 20, "total": 100 }
}
```

### POST /api/postContent

创建新文章。

**请求体：**
```json
{
  "title": "文章标题",
  "description": "文章描述",
  "contents": "文章内容",
  "createTime": "2024-01-01 12:00:00"
}
```

**响应：**
```json
{ "data": "<新文章的 _id>" }
```

### GET /api/getById

根据 ID 获取单篇文章。

**查询参数：**
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 文章的 MongoDB ObjectId |

**响应：**
```json
{ "data": { "_id": "...", "title": "...", "description": "...", "contents": "...", "createTime": "..." } }
```

## License

MIT
