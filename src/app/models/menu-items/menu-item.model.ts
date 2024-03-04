export interface MenuItem {
    id: number;
    code: string;
    title: string;
    link?: string;
    children?: Array<MenuItem>;
    icon?: string;
}
