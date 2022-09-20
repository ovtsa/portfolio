export class Email {
    constructor(
        public senderName: string,
        public senderEmail: string,
        public recipientEmail: string,
        public bodyText: string
    ) {}
}