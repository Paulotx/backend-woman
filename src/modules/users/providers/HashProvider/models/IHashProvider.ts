export default interface IHashProvider {
    generateHash(payload: string): Promise<string>;
    compareHesh(payload: string, hashed: string): Promise<boolean>;
}
