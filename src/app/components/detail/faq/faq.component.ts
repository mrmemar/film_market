import { Component } from '@angular/core';

@Component({
    selector: 'app-faq',
    standalone: true,
    imports: [],
    templateUrl: './faq.component.html',
    styleUrl: './faq.component.sass'
})
export class FaqComponent {
    items: Array<{ active: boolean, question: string, answer: string }> = [];
    active: boolean = false;
    constructor() {
        this.items = [
            {
                active: false,
                question: "چرا از خارج از کشور نمی‌توانیم دانلود کنیم؟",
                answer: "برای مسائل کپی رایت دسترسی دانلود از خارج ایران بسته میباشد لذا اگر از ابزار های تغییر IP استفاده میکنید آنرا خاموش کرده و با IP ایران وارد سایت شوید."
            },
            {
                active: false,
                question: "آیا فیلم مورد نظر مارو قرار میدهد؟",
                answer: "بله فیلم و سریال درخواستی خود را از پنل کاربری درخواست دهید تا قرار گیرد."
            },
            {
                active: false,
                question: "اشتراک تهیه کرده ام اما هنوز فعال نشده ؟",
                answer: "اگر مشکلی در فعال شدن اشتراک بعد از پرداخت موفق دارید از طریق بخش تیکت ها در پنل کاربری مشکل را با پشتیبانی در میان بگذارید تا سریع ترین وقت ممکن حل شود."
            },
            {
                active: false,
                question: "چرا بعضی فیلم و سریال ها صدا ندارند؟",
                answer: "برای مسائل کپی رایت دسترسی دانلود از خارج ایران بسته میباشد لذا اگر از ابزار های تغییر IP استفاده میکنید آنرا خاموش کرده و با IP ایران وارد سایت شوید."
            },
        ]
    }

}
