export type UserProfileToken = {
   
    email: string;
    tokens: {
        refresh: string;
        access: string;
    };
};

export type UserProfile = {
    name: string;
    email: string;   
};