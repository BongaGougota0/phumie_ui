import { Routes } from "@angular/router";
import { FeedComponent } from "./feed/feed.component";
import { ChatComponent } from "./chat/chat.component";
import { ProfileComponent } from "./profile/profile.component";
import { PostComponent } from "./post/post.component";

export const USER_AUTHENTICATED_ROUTES : Routes = [
    { path: "feed", component: FeedComponent },
    { path: "chats", component: ChatComponent },
    { path: "profile/:id", component: ProfileComponent },
    { path: "post/:id", component: PostComponent }
]