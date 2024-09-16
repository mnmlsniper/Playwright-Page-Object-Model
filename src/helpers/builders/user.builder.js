import { faker } from '@faker-js/faker';

export class UserBuilder {
    addBio() {
        this.userBio = faker.music.genre();
        return this;
    }

    addEmail() {
        this.userEmail = faker.internet.email();
        return this;
    }
    addName() {
        this.userName = faker.person.firstName('female');
        return this;
    }
    addPassword() {
        this.userPassword = faker.internet.password();
        return this;
    }
    generate() {
        const copied = structuredClone (
            {
                userEmail: this.userEmail,
                userName: this.userName,
                userPassword: this.userPassword,
                userBio: this.userBio,
            }
        );
        return copied;
    }
}
