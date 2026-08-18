# FateMCP LifaJiri(理发吉日)

>  FateMCP 客户端 —提供理发吉日计算服务

---

## 概述

本MCP服务依据FateMCP命理生态中的确定性择吉计算引擎，综合藏汉历法传统，推算理发、剃头、洗头的最佳日期与时辰，为 AI Agent 提供理发吉日查询能力。

---

## 快速开始

本服务采用**远程 MCP（Remote MCP）**架构：算法部署在 FateMCP 服务器，您**无需安装任何本地包**，直接在 MCP 客户端填入远程地址即可使用。

### 连接地址

```
http://mcp.fatemcp.com/lifajiri/mcp
```

### MCP Agent 配置

在你的 MCP 配置文件中添加：

```json
{
  "mcpServers": {
    "fatemcp-lifajiri": {
      "type": "streamableHttp",
      "url": "http://mcp.fatemcp.com/lifajiri/mcp"
    }
  }
}
```

> 支持 streamableHttp 传输的 MCP 客户端（如 Claude Desktop、Cursor、Cline、Claude Code 等）均可直接接入。
> 部分客户端需通过 `mcp-remote` 桥接，配置如下：

```json
{
  "mcpServers": {
    "fatemcp-lifajiri": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "http://mcp.fatemcp.com/lifajiri/mcp"]
    }
  }
}
```

---

## MCP 工具：`get_haircut_auspicious_days`

查询指定日期范围内的理发吉日及吉时。

### 输入

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `start_date` | string | 否 | 今天 | 开始日期（YYYY-MM-DD） |
| `days` | integer | 否 | 30 | 查询天数（1-365） |

### 输出示例

```json
{
  "query": {
    "start_date": "2026-07-27",
    "days": 30
  },
  "total_auspicious_days": 3,
  "auspicious_days": [
    {
      "date": "2026-07-28",
      "weekday": "星期二",
      "lunar": {
        "day": 15,
        "day_in_chinese": "十五",
        "month_in_chinese": "六月",
        "gan_zhi": "甲子",
        "gan": "甲"
      },
      "tibetan": {
        "year": 2153,
        "month": 6,
        "day": 15,
        "element": "火",
        "animal": "虎",
        "year_display": "火虎年6月15日"
      },
      "wenshu": {
        "name": "大吉",
        "luck": "吉",
        "full_name": "文殊菩萨所示剃头吉日"
      },
      "tibetan_haircut": {
        "name": "增上福报",
        "luck": "吉",
        "full_name": "藏历理发洗头吉日"
      },
      "lucky_slots": [
        {
          "zhi": "卯",
          "hours": "05:00 - 07:00",
          "gan_zhi": "乙卯",
          "tian_shen": "玉堂",
          "type": "黄道",
          "luck": "吉"
        }
      ]
    }
  ]
}
```

---

## 隐私声明

- 所有计算在服务器本地完成
- 理发吉日查询无需个人数据
- 不存储、不记录任何请求信息

---

## 授权

MIT

---

## 相关项目

- [fatemcp/bazi-mcp](https://github.com/fatemcp/bazi-mcp) — 四柱八字推算
