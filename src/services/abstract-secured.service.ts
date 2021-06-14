
import { WebService } from './abstract-web.service';
import { AuthenticationService } from './authentication.service';

export abstract class SecuredService extends WebService {
    constructor() {
        super();
        this.addDynamicHeader('Authorization', () => {
            const token = AuthenticationService.getToken();
            if (!token || !token.token || token.isExpired()) {
                return null;
            }
            return 'Bearer ' + token.token;
        });
    }
}

export {}