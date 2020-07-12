import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ModalLocale } from '../modal/locale';
import { TransferLocale as TransferLocaleForEmpty } from '../empty';
import { PaginationLocale } from '../pagination/Pagination';
import { TableLocale } from '../table/interface';
import { PopconfirmLocale } from '../popconfirm';
import { UploadLocale } from '../upload/interface';
import { TransferLocale } from '../transfer';
import { PickerLocale as DatePickerLocale } from '../date-picker/generatePicker';
export declare const ANT_MARK = "internalMark";
export interface Locale {
    locale: string;
    Pagination?: PaginationLocale;
    DatePicker?: DatePickerLocale;
    TimePicker?: Object;
    Calendar?: Object;
    Table?: TableLocale;
    Modal?: ModalLocale;
    Popconfirm?: PopconfirmLocale;
    Transfer?: Partial<TransferLocale>;
    Select?: Object;
    Upload?: UploadLocale;
    Empty?: TransferLocaleForEmpty;
    global?: Object;
    PageHeader?: Object;
    Icon?: Object;
    Text?: Object;
}
export interface LocaleProviderProps {
    locale: Locale;
    children?: React.ReactNode;
    _ANT_MARK__?: string;
}
export default class LocaleProvider extends React.Component<LocaleProviderProps, any> {
    static defaultProps: {
        locale: {};
    };
    static childContextTypes: {
        antLocale: PropTypes.Requireable<object>;
    };
    constructor(props: LocaleProviderProps);
    getChildContext(): {
        antLocale: {
            exist: boolean;
            locale: string;
            Pagination?: any;
            DatePicker?: DatePickerLocale | undefined;
            TimePicker?: Object | undefined;
            Calendar?: Object | undefined;
            Table?: TableLocale | undefined;
            Modal?: ModalLocale | undefined;
            Popconfirm?: PopconfirmLocale | undefined;
            Transfer?: Partial<TransferLocale> | undefined;
            Select?: Object | undefined;
            Upload?: UploadLocale | undefined;
            Empty?: TransferLocaleForEmpty | undefined;
            global?: Object | undefined;
            PageHeader?: Object | undefined;
            Icon?: Object | undefined;
            Text?: Object | undefined;
        };
    };
    componentDidUpdate(prevProps: LocaleProviderProps): void;
    componentWillUnmount(): void;
    render(): React.ReactNode;
}
