---
description: 部署到正式/测试环境
---

# 部署链接与分支对应关系

| 环境 | 链接 | Git 分支 | Vercel 项目 |
|------|------|----------|------------|
| 🟢 正式环境 | https://sullytest-2-delta.vercel.app/ | `main` | `sullytest-2` |
| 🟡 测试环境 | https://sullytest-beta.vercel.app/ | `beta` | `sullytest-beta` |

> [!IMPORTANT]
> `.vercel/project.json` 默认绑定的是 `sullytest-beta`。
> 部署到**正式环境**必须先切换到 `project.json.bak`（sullytest-2），部署完再切回来。
> Vercel Git 触发的构建最近有问题，建议用 CLI 直接部署。

# 部署到正式环境

// turbo-all

1. 提交要发布的改动到当前分支
2. 合并到 main
```bash
git checkout main
git merge <开发分支> --no-edit
```
3. 切换 Vercel 项目链接到正式环境
```bash
Copy-Item ".vercel\project.json" ".vercel\project.json.beta"
Copy-Item ".vercel\project.json.bak" ".vercel\project.json"
```
4. 本地构建并部署
```bash
npx vite build
npx -y vercel --prod
```
5. 恢复项目链接并切回开发分支
```bash
Copy-Item ".vercel\project.json.beta" ".vercel\project.json"
git checkout <开发分支>
```

# 部署到测试环境

// turbo-all

1. 提交要发布的改动到当前分支
2. 合并到 beta
```bash
git checkout beta
git merge <开发分支> --no-edit
git push origin beta
```
3. CLI 默认绑定的就是 beta，直接部署即可（或等 Git 触发）
```bash
npx vite build
npx -y vercel --prod
```
4. 切回开发分支
```bash
git checkout <开发分支>
```
