import * as React from 'react';
import { GenerateConfig } from 'rc-picker/lib/generate/index';
import { PickerBaseProps as RCPickerBaseProps, PickerDateProps as RCPickerDateProps, PickerTimeProps as RCPickerTimeProps } from 'rc-picker/lib/Picker';
import { RangePickerBaseProps as RCRangePickerBaseProps, RangePickerDateProps as RCRangePickerDateProps, RangePickerTimeProps as RCRangePickerTimeProps } from 'rc-picker/lib/RangePicker';
import { Locale as RcPickerLocale } from 'rc-picker/lib/interface';
import { SizeType } from '../config-provider/SizeContext';
import { TimePickerLocale } from '../time-picker';
declare type InjectDefaultProps<Props> = Omit<Props, 'locale' | 'generateConfig' | 'prevIcon' | 'nextIcon' | 'superPrevIcon' | 'superNextIcon' | 'hideHeader' | 'components'> & {
    locale?: PickerLocale;
    size?: SizeType;
    bordered?: boolean;
};
export declare type PickerLocale = {
    lang: RcPickerLocale & AdditionalPickerLocaleLangProps;
    timePickerLocale: TimePickerLocale;
} & AdditionalPickerLocaleProps;
export declare type AdditionalPickerLocaleProps = {
    dateFormat?: string;
    dateTimeFormat?: string;
    weekFormat?: string;
    monthFormat?: string;
};
export declare type AdditionalPickerLocaleLangProps = {
    placeholder: string;
    yearPlaceholder?: string;
    quarterPlaceholder?: string;
    monthPlaceholder?: string;
    weekPlaceholder?: string;
    rangeYearPlaceholder?: [string, string];
    rangeMonthPlaceholder?: [string, string];
    rangeWeekPlaceholder?: [string, string];
    rangePlaceholder?: [string, string];
};
export declare type PickerBaseProps<DateType> = InjectDefaultProps<RCPickerBaseProps<DateType>>;
export declare type PickerDateProps<DateType> = InjectDefaultProps<RCPickerDateProps<DateType>>;
export declare type PickerTimeProps<DateType> = InjectDefaultProps<RCPickerTimeProps<DateType>>;
export declare type PickerProps<DateType> = PickerBaseProps<DateType> | PickerDateProps<DateType> | PickerTimeProps<DateType>;
export declare type RangePickerBaseProps<DateType> = InjectDefaultProps<RCRangePickerBaseProps<DateType>>;
export declare type RangePickerDateProps<DateType> = InjectDefaultProps<RCRangePickerDateProps<DateType>>;
export declare type RangePickerTimeProps<DateType> = InjectDefaultProps<RCRangePickerTimeProps<DateType>>;
export declare type RangePickerProps<DateType> = RangePickerBaseProps<DateType> | RangePickerDateProps<DateType> | RangePickerTimeProps<DateType>;
declare function generatePicker<DateType>(generateConfig: GenerateConfig<DateType>): React.ComponentClass<PickerProps<DateType>, any> & {
    WeekPicker: React.ComponentClass<Pick<InjectDefaultProps<RCPickerDateProps<DateType>>, "size" | "style" | "direction" | "prefixCls" | "className" | "disabled" | "onClick" | "defaultValue" | "placeholder" | "tabIndex" | "role" | "aria-activedescendant" | "aria-atomic" | "aria-autocomplete" | "aria-busy" | "aria-checked" | "aria-colcount" | "aria-colindex" | "aria-colspan" | "aria-controls" | "aria-current" | "aria-describedby" | "aria-details" | "aria-disabled" | "aria-dropeffect" | "aria-errormessage" | "aria-expanded" | "aria-flowto" | "aria-grabbed" | "aria-haspopup" | "aria-hidden" | "aria-invalid" | "aria-keyshortcuts" | "aria-label" | "aria-labelledby" | "aria-level" | "aria-live" | "aria-modal" | "aria-multiline" | "aria-multiselectable" | "aria-orientation" | "aria-owns" | "aria-placeholder" | "aria-posinset" | "aria-pressed" | "aria-readonly" | "aria-relevant" | "aria-required" | "aria-roledescription" | "aria-rowcount" | "aria-rowindex" | "aria-rowspan" | "aria-selected" | "aria-setsize" | "aria-sort" | "aria-valuemax" | "aria-valuemin" | "aria-valuenow" | "aria-valuetext" | "onFocus" | "onBlur" | "onChange" | "onContextMenu" | "onMouseDown" | "onMouseEnter" | "onMouseLeave" | "onMouseUp" | "onSelect" | "autoFocus" | "name" | "value" | "open" | "format" | "locale" | "mode" | "defaultPickerValue" | "disabledDate" | "dateRender" | "monthCellRender" | "renderExtraFooter" | "onPanelChange" | "onOk" | "dropdownClassName" | "dropdownAlign" | "popupStyle" | "transitionName" | "allowClear" | "defaultOpen" | "inputReadOnly" | "suffixIcon" | "clearIcon" | "getPopupContainer" | "onOpenChange" | "pickerRef" | "showToday" | "showTime" | "disabledTime" | "bordered">, any>;
    MonthPicker: React.ComponentClass<Pick<InjectDefaultProps<RCPickerDateProps<DateType>>, "size" | "style" | "direction" | "prefixCls" | "className" | "disabled" | "onClick" | "defaultValue" | "placeholder" | "tabIndex" | "role" | "aria-activedescendant" | "aria-atomic" | "aria-autocomplete" | "aria-busy" | "aria-checked" | "aria-colcount" | "aria-colindex" | "aria-colspan" | "aria-controls" | "aria-current" | "aria-describedby" | "aria-details" | "aria-disabled" | "aria-dropeffect" | "aria-errormessage" | "aria-expanded" | "aria-flowto" | "aria-grabbed" | "aria-haspopup" | "aria-hidden" | "aria-invalid" | "aria-keyshortcuts" | "aria-label" | "aria-labelledby" | "aria-level" | "aria-live" | "aria-modal" | "aria-multiline" | "aria-multiselectable" | "aria-orientation" | "aria-owns" | "aria-placeholder" | "aria-posinset" | "aria-pressed" | "aria-readonly" | "aria-relevant" | "aria-required" | "aria-roledescription" | "aria-rowcount" | "aria-rowindex" | "aria-rowspan" | "aria-selected" | "aria-setsize" | "aria-sort" | "aria-valuemax" | "aria-valuemin" | "aria-valuenow" | "aria-valuetext" | "onFocus" | "onBlur" | "onChange" | "onContextMenu" | "onMouseDown" | "onMouseEnter" | "onMouseLeave" | "onMouseUp" | "onSelect" | "autoFocus" | "name" | "value" | "open" | "format" | "locale" | "mode" | "defaultPickerValue" | "disabledDate" | "dateRender" | "monthCellRender" | "renderExtraFooter" | "onPanelChange" | "onOk" | "dropdownClassName" | "dropdownAlign" | "popupStyle" | "transitionName" | "allowClear" | "defaultOpen" | "inputReadOnly" | "suffixIcon" | "clearIcon" | "getPopupContainer" | "onOpenChange" | "pickerRef" | "showToday" | "showTime" | "disabledTime" | "bordered">, any>;
    YearPicker: React.ComponentClass<Pick<InjectDefaultProps<RCPickerDateProps<DateType>>, "size" | "style" | "direction" | "prefixCls" | "className" | "disabled" | "onClick" | "defaultValue" | "placeholder" | "tabIndex" | "role" | "aria-activedescendant" | "aria-atomic" | "aria-autocomplete" | "aria-busy" | "aria-checked" | "aria-colcount" | "aria-colindex" | "aria-colspan" | "aria-controls" | "aria-current" | "aria-describedby" | "aria-details" | "aria-disabled" | "aria-dropeffect" | "aria-errormessage" | "aria-expanded" | "aria-flowto" | "aria-grabbed" | "aria-haspopup" | "aria-hidden" | "aria-invalid" | "aria-keyshortcuts" | "aria-label" | "aria-labelledby" | "aria-level" | "aria-live" | "aria-modal" | "aria-multiline" | "aria-multiselectable" | "aria-orientation" | "aria-owns" | "aria-placeholder" | "aria-posinset" | "aria-pressed" | "aria-readonly" | "aria-relevant" | "aria-required" | "aria-roledescription" | "aria-rowcount" | "aria-rowindex" | "aria-rowspan" | "aria-selected" | "aria-setsize" | "aria-sort" | "aria-valuemax" | "aria-valuemin" | "aria-valuenow" | "aria-valuetext" | "onFocus" | "onBlur" | "onChange" | "onContextMenu" | "onMouseDown" | "onMouseEnter" | "onMouseLeave" | "onMouseUp" | "onSelect" | "autoFocus" | "name" | "value" | "open" | "format" | "locale" | "mode" | "defaultPickerValue" | "disabledDate" | "dateRender" | "monthCellRender" | "renderExtraFooter" | "onPanelChange" | "onOk" | "dropdownClassName" | "dropdownAlign" | "popupStyle" | "transitionName" | "allowClear" | "defaultOpen" | "inputReadOnly" | "suffixIcon" | "clearIcon" | "getPopupContainer" | "onOpenChange" | "pickerRef" | "showToday" | "showTime" | "disabledTime" | "bordered">, any>;
    RangePicker: React.ComponentClass<RangePickerProps<DateType>, any>;
    TimePicker: React.ComponentClass<Pick<InjectDefaultProps<RCPickerTimeProps<DateType>>, "size" | "style" | "direction" | "prefixCls" | "className" | "disabled" | "onClick" | "defaultValue" | "placeholder" | "tabIndex" | "role" | "aria-activedescendant" | "aria-atomic" | "aria-autocomplete" | "aria-busy" | "aria-checked" | "aria-colcount" | "aria-colindex" | "aria-colspan" | "aria-controls" | "aria-current" | "aria-describedby" | "aria-details" | "aria-disabled" | "aria-dropeffect" | "aria-errormessage" | "aria-expanded" | "aria-flowto" | "aria-grabbed" | "aria-haspopup" | "aria-hidden" | "aria-invalid" | "aria-keyshortcuts" | "aria-label" | "aria-labelledby" | "aria-level" | "aria-live" | "aria-modal" | "aria-multiline" | "aria-multiselectable" | "aria-orientation" | "aria-owns" | "aria-placeholder" | "aria-posinset" | "aria-pressed" | "aria-readonly" | "aria-relevant" | "aria-required" | "aria-roledescription" | "aria-rowcount" | "aria-rowindex" | "aria-rowspan" | "aria-selected" | "aria-setsize" | "aria-sort" | "aria-valuemax" | "aria-valuemin" | "aria-valuenow" | "aria-valuetext" | "onFocus" | "onBlur" | "onChange" | "onContextMenu" | "onMouseDown" | "onMouseEnter" | "onMouseLeave" | "onMouseUp" | "onSelect" | "autoFocus" | "name" | "value" | "open" | "format" | "showHour" | "showMinute" | "showSecond" | "use12Hours" | "locale" | "mode" | "defaultPickerValue" | "disabledDate" | "dateRender" | "monthCellRender" | "renderExtraFooter" | "onPanelChange" | "onOk" | "dropdownClassName" | "dropdownAlign" | "popupStyle" | "transitionName" | "allowClear" | "defaultOpen" | "inputReadOnly" | "suffixIcon" | "clearIcon" | "getPopupContainer" | "onOpenChange" | "pickerRef" | "hourStep" | "minuteStep" | "secondStep" | "hideDisabledOptions" | "disabledHours" | "disabledMinutes" | "disabledSeconds" | "defaultOpenValue" | "bordered">, any>;
};
export default generatePicker;
