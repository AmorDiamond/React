let testPageData: any = {
  current: 1,
  pageSize: 10,
  totalCount: 10,
  content: []
};

for (var i = 0; i < 10; i++) {
  let item = {
    id: i,
    index: i,
    code: "00" + i,
    backendName: "后台名称" + i,
    name: "名称" + i,
    createBy: "zxz",
    category: 1,
    updateTimestamp: "2014-01-01"
  };
  testPageData.content.push(item);
}
export { testPageData };
