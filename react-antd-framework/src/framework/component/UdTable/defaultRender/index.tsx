import React from "react";
import { TableColumn, ITableColumnTranslate, ITableColumnBtnList, ITableColumnBtn, ColumnTypes } from "../types";
// import { GetActionButtons, getAcctions } from "../../UdActionButton/ActionButtons";
import { GetActionButtons, getAcctions, IBaseActionBtn, IGetActionBtnsParam } from "@ui/UdActionButton/ActionButtons";
import { getTableBtns } from "../method";

//获取列render
export function getColumnRender<T>(column: TableColumn<T>, btnAttr: IBaseActionBtn<T> = { loading: false, defaultLoadingKey: "all" }) {
  let render;
  //默认render
  let defaultRender: any = {
    [ColumnTypes.Translate]: (column: ITableColumnTranslate<T>) => {
      let options = column.option;
      return (text: any, record: T, index: number) => <span>{options[text]}</span>;
    },
    [ColumnTypes.TranslateNull]: (column: ITableColumnBtnList<T>) => {
      return (text: any, record: T, index: number) => (text == null ? "--" : text);
    },
    [ColumnTypes.BtnList]: (column: ITableColumnBtnList<T>) => {
      // const btnAttr: any = btnAttr || {};
      // let { submitData, changeModal,} = btnAttr;
      let { normalBtn, dropDownBtns } = column;

      return (text: any, data: T, index: number) => {
        const defaultClass = ["table-btn"];
        let normalOpsParams: IGetActionBtnsParam<T> = { btnlist: normalBtn, data, defaultClass, ...btnAttr };
        const normalOps = GetActionButtons(normalOpsParams);
        let dropDownOps: any = [];
        if (dropDownBtns) {
          let dropDownOpParams: IGetActionBtnsParam<T> = { btnlist: dropDownBtns, data, defaultClass, ...btnAttr };
          dropDownOps = GetActionButtons(dropDownOpParams);
        }

        return getTableBtns(normalOps, dropDownOps);
      };
    },
    [ColumnTypes.Btn]: (column: ITableColumnBtn<T>) => {
      btnAttr = btnAttr || {};
      const defaultClass = ["table-btn"];
      let { submitData, changeModal, loading = false, defaultLoadingKey = "all" } = btnAttr;
      const { btnInfo } = column;
      return (text: any, data: T, index: number) => {
        let Btn;
        if (!btnInfo.isShow || btnInfo.isShow(data)) {
          const ModalType = ["Form", "Modal"]; //"Confirm",  "Modal",
          let submit: any = ModalType.indexOf(btnInfo.action.type) > -1 ? changeModal : submitData;
          submit = submit ? submit : () => {};
          Btn = getAcctions<T>({ btnInfo, data, defaultClass, submit, loading, defaultLoadingKey, key: index });
        }
        return Btn;
      };
    }
  };

  if (column.columnType) {
    render = defaultRender[column.columnType](column);
  }

  return render;
}
