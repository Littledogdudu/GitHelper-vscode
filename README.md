# gitautoadd README

当你创建，删除和修改文件时，它会自动帮你完成git add操作。  
*When you create, delete or edit, it will git add automatically for you.*

## Features

- 自动git add！  
- 为rollback提供右键和快捷键 `ctrl` `alt` `z`  
- 为stash（贮藏）和stash pop 提供右键和快捷键  
    > git stash `ctrl` `alt` `s`  
    > git stash pop `ctrl` `alt` `p`

![alt text](https://github.com/Littledogdudu/GitHelper-vscode/blob/master/assets/README/image.png)

> Tip: 实现很简单哦，就是在控制台执行命令

## Requirements
建议：  
|requirement|version|
| - | - |
|VsCode|1.87.0|
|Nodejs|16.20.2|

## Extension Settings

* `GitAutoAdd.skysource2030.rollbackAutoSave`: 是否开启回滚自动保存
* `GitAutoAdd.skysource2030.rollbackAutoSavePath`: 配置回滚自动保存路径
* `GitAutoAdd.skysource2030.gitAutoAdd`: 是否开启自动 `git add` 功能
* `GitAutoAdd.skysource2030.ignoreList`: 自动 `git add` 忽略操作的文件夹/文件名称

示例(这里采用的默认值)：
```json
"GitAutoAdd.skysource2030.rollbackAutoSave": true,
"GitAutoAdd.skysource2030.rollbackAutoSavePath": "C:\\Users\\Public\\Documents\\backup",
"GitAutoAdd.skysource2030.gitAutoAdd": true,
"GitAutoAdd.skysource2030.ignoreList": [".git",".vscode"],

```

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

### 1.0.0

初始版本  
Initial version
