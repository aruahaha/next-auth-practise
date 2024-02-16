import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

const options = {
    providers: [
        GitHubProvider({
            profile(profile) {
                console.log("Profile Github :-", profile)

                let userRole = "GitHub User"
                if (profile?.email == "arushkewalramani45@gmail.com") {
                    userRole = "admin"
                }

                return {
                    ...profile,
                    role: userRole
                };
            },
            clientId:process.env.GITHUB_ID,
            clientSecret:process.env.GITHUB_SECRET
        }),
        GoogleProvider({
            profile(profile) {
                console.log("Profile Google :-", profile)

                let userRole = "Google User"
                if (profile?.email == "arushkewalramani45@gmail.com") {
                    userRole = "admin"
                }

                return {
                    ...profile,
                    id: profile.sub,
                    role: userRole
                };
            },
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_SECRET
        }),
    ],
    callbacks :{
        async jwt({user,token}) {
            if(user) token.role = user.role
            return token
        },
        async session({session,token}){
            if(session?.user) session.user.role = token.role
            return session
        }
    }
}

export default options;