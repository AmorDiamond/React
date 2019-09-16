import { observable, action } from "mobx";
import http from "@/utils/http";

const urlObject = {
  test: "/getOptions",
  //发起系统
  channel: "/projects/selectProjects",
  operator: "/getOptions",
  orderStatus: "/workOrders/allStatus",
  questiionBankName: "/questionBases/selectQuestionBase",
  categoryBase: "/categories/selectFirstLevel",
  projectPrincipals: "/projects/addAndUpdateProject",
  selectQuestionBase: "/questionBases/selectQuestionBase",
  //转单
  transferSys: "/planOrders/selectQuestionType",
  //受理人或
  contacts: "/contacts/selectContact",
  questionBases: "/questionBases/selectQuestionBase",
  province: '/api/self/evaluationDetail/province'
};

/** 普通页面store定义 */
class NormalPage {
  @observable
  public selectOpitons: any = {};
  @observable
  public loading: boolean = false;
  @action
  public getOptions = (key: string) => {
    let url = urlObject[key];
    const Self = this;
    if (url != null) {
      http
        .get(url)
        .then(res => {
          Self.selectOpitons[key] = res;
        })
        .catch(res => {});
    }
  };
}

/** 实例 */
const normalPage = new NormalPage();

export default normalPage;
