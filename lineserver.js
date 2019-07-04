const Line = require('@line/bot-sdk');
const config = {
  channelAccessToken: `sT6Tt092jalhUs+lCLaPnpHI6KX/hL+V7Pd7/Ag/PsmL28Cior2ssMuNghVItUN4ld5PtOYAo1oQ6Wzh24ZWEwSZVbOIyL5dYzNwC/SuJ7VAdd+xxsdlDuFsHfPTt179Cm7s0OiR4eKArMd6f9WT6AdB04t89/1O/w1cDnyilFU=`,
  channelSecret: `d11dbd7582b7a43d3b5e32dca0de5905`
}

const lineServer = new Line.Client(config)
module.exports = lineServer
