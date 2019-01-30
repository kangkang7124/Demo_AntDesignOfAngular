export interface IMenu {
    id: string;
    name: string;
    href: string;
    parentId: string;
    icon: string;
    children?: IMenu[];

    [key: string]: any;
}
