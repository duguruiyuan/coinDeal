
// 单次操作数量
var number = 100;

// 火币
var huobi = {
  name: 'huobi',
  // 费率
  Deal: 0.001,
  coin: {
    XRP: 16.35
  }
};
// 币安
var bian = {
  name: 'bian',
  // 费率
  Deal: 0.0005,
  coin: {
    XRP: 17.01
  }
}
// ZB价格
var ZB = {
  name: 'ZB',
  // 费率
  Deal: 0.001,
  coin: {
    XRP: 19.00
  }
};

var platformArr = [
  huobi,
  bian,
  ZB
]




function getInfo() {
  getAllMargin(platformArr)
}

// 获取第一个平台所有币种对比其他平台的利差
function getAllMargin (pArr) {
  var o = pArr[0]
  for (const coinKey in o.coin) {
    if (o.coin.hasOwnProperty(coinKey)) {
      // const price = o.coin[coinKey];
      // console.log('pArr:', pArr)
      getMarginByCoin(pArr, coinKey)
    }
  }
}

// 根据COIN获取平台利差
function getMarginByCoin (pArr, coinKey) {
  var _pArr = pArr.sort(function (a, b) {
    return b.coin[coinKey] - a.coin[coinKey]
  })
  // console.log(_pArr)

  // 判断价格，决定买卖方
  doDeal(pArr[0], pArr[pArr.length - 1], number, coinKey)
}

/**
 * 
 * @param {Object} salePlatform 出售平台
 * @param {Object} buyPlatform 买入平台
 * @param {Int} num 操作数量
 * @param {String} coinKey 代币名称
 */
function doDeal (salePlatform, buyPlatform, num, coinKey) {
  var saleTotalPrice = (salePlatform.coin[coinKey] * num) * (1 - salePlatform.Deal)
  var buyTotalPrice = (buyPlatform.coin[coinKey] * num) * (1 + buyPlatform.Deal)
  console.log('操作代币为：', coinKey, '数量：', num)
  console.log('卖出平台:', salePlatform.name, '价格:', salePlatform.coin[coinKey])
  console.log('买入平台:', buyPlatform.name, '价格:', buyPlatform.coin[coinKey])
  console.log('利润率为：', salePlatform.coin[coinKey] / buyPlatform.coin[coinKey] * 100 + '%')
  console.log('扣除交易费用，这次交易可以获利：', saleTotalPrice - buyTotalPrice)

  // var salePrice = (saleXrp * num) * (1 - saleDeal)
  // console.log('salePrice', salePrice)
  // var buyPrice = (buyXrp * num) * (1 - buyDeal)
  // console.log('buyPrice', buyPrice)
  // var margin = salePrice - buyPrice
  // console.log('这次交易可以获利：', margin)
}