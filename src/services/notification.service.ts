import toastr from 'toastr';

export class NotificationService {

    public static init(): void {
        toastr.options.positionClass = 'toast-bottom-center';
        toastr.options.progressBar = false;
        toastr.options.closeButton = true;
    }

    public static success(...message: string[]): void {
        toastr.success(message.join(' '));
    }

    public static info(...message: string[]): void {
        toastr.info(message.join(' '));
    }

    public static warning(...message: string[]): void {
        toastr.warning(message.join(' '));
    }

    public static error(...message: string[]): void {
        toastr.error(message.join(' '));
    }

}

NotificationService.init();