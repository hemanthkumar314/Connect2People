# SnapGram (Social Media Application)

## Overview
Build a modern Social Media Application(SnapGram) with a stunning UI ,a special tech stack, an infinite explore posts scroll feature, and amazing performance using React JS, Appwrite, TypeScript, and more.

## Key Features
- **User-Friendly Interface**: Enjoy a simple and intuitive interface by adjusting parameters to fine-tune the application, ensuring they align with your vision.
- **User Registration and Authentication**: Users can sign up for an account and log in to access the Application.Passwords are securely hashed and stored in AppWrite Cloud Database and Auth.
- **Home Feed Page**: The Home Feed shows posts from your friends and followed accounts. It's the main area where you can scroll through updates and interact with posts.
- **Exploring Posts Page**: The Explore page lets you discover new content from people or topics you don't follow yet with a infinite scroll feature. You can browse trending posts or search for specific interests.
- **Saved Posts Page**: The Saved Posts page contains all the posts you've bookmarked. You can easily access your favorite posts here at any time.
- **Creating Post**: You can create and share a new post by uploading photos, videos, or text. Customize it with captions and tags, then share it with your followers.
- **Friends Interaction**: Interact with your friends by liking, commenting, or sharing their posts. You can also send friend requests and contact them directly.

## Technologies Used

### Front End
- **Vite + ReactJS**
- **Tailwind CSS**
- **Shadcn UI**

### Back End
- **NodeJS**: Handles server-side logic, processes user requests, and interacts with the database.
- **AppWrite Cloud**: Stores all data related to Users (userId, Username, and hasedPassword etc..),Posts (title, images, and prompts) and Saves.


## Getting Started

### Prerequisites
- **NodeJS(Node Package Manager)**
- **Appwrite Account**

### Installation

1. Clone the Repository:
   ```bash
   git clone https://github.com/hemanthkumar314/Social_Media_Application.git
   cd Social_Media_Application
2. First, create an account on AppWrite Cloud to obtain your `Your_Appwrite_URL`
3. Create a project in the Cloud to receive your `Your_Appwrite_Project_URL`.. Then, create a storage bucket to get the `Your_Appwrite_Storage_URL`, and set up a database using the and a Database with `Your_Appwrite_Project_URL`
4. Next, create three collections in the database, namely Users, Posts, and Saves, and obtain their respective IDs.
5. We need to setup Attributes and build relationships between the collections to work them off.
6. Create a `.env` file in the root directory with the following environment variables:

   ```env
     VITE_APPWRITE_URL=Your_Appwrite_URL
     VITE_APPWRITE_PROJECT_ID=Your_Appwrite_Project_URL
     VITE_APPWRITE_STORAGE_ID=Your_Appwrite_Storage_URL
     VITE_APPWRITE_DATABASE_ID=Your_Appwrite_Database_URL
     VITE_APPWRITE_POST_COLLECTION_ID=Your_Appwrite_Database_Post_Collection_URL
     VITE_APPWRITE_USER_COLLECTION_ID=Your_Appwrite_Database_user_Collection_URL
     VITE_APPWRITE_SAVES_COLLECTION_ID=Your_Appwrite_Database_Saves_Collection_URL
  

### Usage

1. Run the Frontend and navigate to ` http://localhost:5173 ` in broswer
   
   ```bash
   npm run dev

2. Sign up or log in using your Google Account
3. Now, Enjoy your Social Media Application
