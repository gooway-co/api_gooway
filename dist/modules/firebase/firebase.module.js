"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const admin = require("firebase-admin");
const firebaseProvider = {
    provide: 'FIREBASE_APP',
    inject: [config_1.ConfigService],
    useFactory: (configService) => {
        const firebaseConfig = {
            type: "service_account",
            project_id: "gooway-9d5d9",
            private_key_id: "014c1b08327de45ea0bad33b450e6e3f7681952c",
            private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCyeaXqKBpakNmw\nCx1HGWcY8up7OOd9X5AJSJaO/1RMb2M4EVAhH7Nf+tozSBb/QYchLKTMlUPC9TkK\nHLaZV4M82aO8OxZnU6ONUXAb38dcD3j1flGtFxjhDYTAVBlknMW3yzsdDtIbp++t\n2O8nay4snnc3lW4N4v+vdf+URh2C9FM6AB9uUeQq6AXFL3cOQUKoTy+nqRBcoxkc\nepH35UGQ1NebzQZ8WE7smeD4tMYrZRLLoEG5RIq8Ubyfs4d7zyZJ+EKLLuOHOgqb\nn5UYiBWZAgOLUjaIgmcAzJbR6UjervBlzwMOXV0leNgWgLBcSmhzMpFfHDwAmBqW\nVn41L195AgMBAAECggEAAx4++NVUiIqJUxsOmuRlubjcweRfnwAhaxgakUsCtQcp\nK5yZ0spT/vRKBaVXyYPikYDPLEfbVDemlHel9Q3jXBfNVYeOv6VlcR2gIMyLFh+r\nFFbtpGGH7L6ouBeADhLzHV/um3Zb02HevSHSI9UqjFsEaDMzJgj2QKGGIpgLAfOt\nWIj/CHZdiHR/Z82Nlar4y4LdD/dcamVtmEnL+hoTw0us0WrXLsNpYBr9CT7vV/1t\nqrC42AT30hM0ud0RtFeiRdLgeCun33c0CvQAyBZwpuAN/rmk7UXRx9AfLuw2++4M\nb5nDgEZCxGMiv6LmgOmd7YhvPJSbeDKegMob2boNgQKBgQDj9KkYq9hubw+Wf9dz\nyFdts0OtEGPzaaJ0tGLclZKJVBOar/510VtyVMeN52FNIKNCoAkF+YrNS/fR5Rih\n6Wbb+nZbeNwcpdThRGrP2dbCYLMlguc6HfqXAGeaQbx9Z05UsV921wpjb47wI2qK\nVYM7XZLPktUfBj/WMNnKIVZwSQKBgQDIbqA73o56PttfVFU+P8CW6tYrbrUKq33Z\ndWt99W1bJPUVU5/tGGjR+BqCahgXk9zxdQ/Y++ksxcDO/UcmirrgrZn72p+tz/BW\nsUyHhC0/QDLy4AfLPzZqzTdgfmxQBHMVaUSY86Hj4Nzocpsl2D8NFDOYbqHgNSBw\nWblf0wfVsQKBgQC4+mdhYsl9S9hNWy49gTwZA9gODvfcpUK0C1ESCLnhgH1sEBag\nCqR3UX6hkzns+Wgh/3VzCL1uvI+8HnjvolPafBMhRSDwik0GA5vdULsp/ohBD0mN\naphXgnePwHoxFOyGY2zBJd0DNZq7GTIyURPtz4/7qv4Qb+TLbda9ZHIdKQKBgQCN\nXsH0GHEkNkui/Ke3ZV4g1HjFX6ugX/8/L3vm9wHwBKw9I6OspsfgOX/xNoXRs4Bm\naqwH3v7DjqQFG05hF/7h1HDE3Jo+DWm2rA2PlCIZ9903w96bc/Wc9Sw3ClS5R7oo\ngvxYaZdpVMRby+I0mkc2oWYXAQl6S96agB6pQP7IsQKBgQCD6G1NftaUvccaD97D\nKZ6POV2A3tS8kVZlPxwG6YF8PtZspZFbu5sNE/PV1tXjhESH6oW15a4YlqLwlyvA\nazE1G5N0rSQ+j3TwX0bR0YlR1EQXvg8pUg3xrp0xUDwmFkzZrtDv4TxybUb8pdt/\ngwyv6ojjGdxGpRQkXgjqD7PCCg==\n-----END PRIVATE KEY-----\n",
            client_email: "firebase-adminsdk-ausqh@gooway-9d5d9.iam.gserviceaccount.com",
            client_id: "111917503621152270295",
            auth_uri: "https://accounts.google.com/o/oauth2/auth",
            token_uri: "https://oauth2.googleapis.com/token",
            auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
            client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ausqh%40gooway-9d5d9.iam.gserviceaccount.com",
            universe_domain: "googleapis.com"
        };
        return admin.initializeApp({
            credential: admin.credential.cert(firebaseConfig),
            databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
            storageBucket: `${firebaseConfig.projectId}.appspot.com`,
        });
    }
};
let FirebaseModule = class FirebaseModule {
};
exports.FirebaseModule = FirebaseModule;
exports.FirebaseModule = FirebaseModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [firebaseProvider],
        exports: [firebaseProvider],
    })
], FirebaseModule);
//# sourceMappingURL=firebase.module.js.map