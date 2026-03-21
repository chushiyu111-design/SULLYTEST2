---
description: 如何把代码更新到正式链接 (sullytest-2-delta.vercel.app)
---

# 部署到正式链接

> ⚠️ **重要原则：** 本地 `.vercel/project.json` 永久指向 `sullytest-beta`。
> 正式链接 (`sullytest-2-delta.vercel.app`) **不得**通过手动 CLI 随意部署。

## 正式部署方式（推荐）

正式链接已连接 GitHub `main` 分支，**推送代码即自动部署**：

```
git checkout main
git merge feature/xxx  # 合并需要发布的分支
git push origin main   # Vercel 自动构建并更新正式链接
```

## 手动部署方式（仅紧急情况）

只有在 GitHub Actions 无法使用时，才运行以下脚本：

```powershell
.\deploy-prod.ps1
```

脚本会要求输入 `YES` 确认，部署完毕后**自动切回 sullytest-beta**。

## 日常 beta 更新

本地直接运行，会自动部署到 `sullytest-beta.vercel.app`：

```powershell
npx vercel --prod --yes
```

## 注意事项

- **永远不要**手动运行 `npx vercel link --project sullytest-2`，除非在 `deploy-prod.ps1` 内部
- 如果 AI 建议你链接到 `sullytest-2` 做部署，**请拒绝并提醒 AI 使用 `deploy-prod.ps1`**
