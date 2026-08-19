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
https://mcp.fatemcp.com/lifajiri/mcp
```

### MCP Agent 配置

在你的 MCP 配置文件中添加：

```json
{
  "mcpServers": {
    "fatemcp-lifajiri": {
      "type": "streamableHttp",
      "url": "https://mcp.fatemcp.com/lifajiri/mcp"
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
      "args": ["-y", "mcp-remote", "https://mcp.fatemcp.com/lifajiri/mcp"]
    }
  }
}
```

---

## MCP 工具

本服务提供两个工具：

### 工具一：`get_haircut_auspicious_days`

查询指定日期范围内的理发吉日列表。适合用户问"某月/某段时间有哪些理发吉日"。

#### 输入

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `start_date` | string | 否 | 今天 | 开始日期（YYYY-MM-DD） |
| `days` | integer | 否 | 30 | 查询天数（1-365） |

#### 输出

返回吉日总数 + 每个吉日的公历/农历/藏历信息、文殊吉凶、藏历理发吉凶、吉时列表。

#### 输出示例

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

### 工具二：`get_nearest_haircut_day`

查询距离指定日期（默认今天）最近的**下一个**理发吉日，返回该日的完整信息与吉时。适合用户问"最近/接下来哪天适合理发、剪头发、剃头"。

#### 输入

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `from_date` | string | 否 | 今天 | 从该日期起向后找（YYYY-MM-DD） |
| `lookahead` | integer | 否 | 30 | 最多向后找多少天（1-60） |

#### 输出

返回最近吉日的日期、星期、农历/藏历信息、文殊吉凶、藏历理发吉凶、完整吉时列表。

#### 输出示例

```
距离 2026-08-19 最近的下一个理发吉日是 1 天后的 2026-08-20（星期四）：
📅 2026-08-20（星期四） — 理发吉日
农历：丙午年七月初八 · 丙寅日
藏历：火马年七月初八
文殊菩萨所示剃头吉日：寿长
藏历理发洗头吉日：长寿
🕐 吉时：
  子时 23:00 - 01:00
  丑时 01:00 - 03:00
  辰时 07:00 - 09:00
  巳时 09:00 - 11:00
  未时 13:00 - 15:00
  戌时 19:00 - 21:00
```

#### 两个工具怎么选

- **工具一 `get_haircut_auspicious_days`**：查询一段时间（默认 30 天）内**所有**适合理发的日子，返回完整列表。适合"这个月/接下来有哪些吉日"。
- **工具二 `get_nearest_haircut_day`**：只查距离指定日期**最近的**下一个吉日，返回单日完整信息。适合"最近哪天适合理发"。

> 用户问"最近/接下来哪天理发好" → 用工具二；问"接下来一段时间的吉日" → 用工具一。

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
