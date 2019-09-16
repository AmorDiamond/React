import React, { ReactNode } from "react";
import { UdFormControls } from "../types/controls";

import ContorlInput from "./ContorlInput";
import ContorlTextArea from "./ContorlTextArea";

import ContorlSelect from "./ContorlSelect";
import ContorlAjaxSelect from "./ContorlAjaxSelect";
import ContorlTreeSelect from "../../../component/UdFormControl/ContorlTreeSelect";

import ContorlDatePicker from "./ContorlDatePicker";
import ContorlDateRange from "./ContorlDateRange";
import ContorlRadio from "./ContorlRadio";



type IUdControls = { [propName in UdFormControls]: ReactNode };
const UdControls: IUdControls = {
  /** 概属性为多余值，先放在这里保证UdControls与UdFormControls同步*/
  [UdFormControls.SelfControl]: ContorlInput,
  /**其他属性 */
  [UdFormControls.Input]: ContorlInput,
  [UdFormControls.TextArea]: ContorlTextArea,

  [UdFormControls.Select]: ContorlSelect,
  [UdFormControls.AjaxSelect]: ContorlAjaxSelect,
  // [UdFormControls.ContorlTreeSelect]: ContorlTreeSelect,

  [UdFormControls.DatePicker]: ContorlDatePicker,
  [UdFormControls.DateRange]: ContorlDateRange,
  [UdFormControls.Radio]: ContorlRadio
};

export default UdControls;
