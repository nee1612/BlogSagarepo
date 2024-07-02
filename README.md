
# BlogSage 

BlogSage is a dynamic blogging platform that allows users to post, read, and comment on blogs. Built with modern web technologies, BlogSage ensures a seamless and interactive user experience.


## Features

- **Create and Read Blogs :** Users can write and publish blogs using the rich text editor, Quill.
- **Comment on Blogs :** Engage with the community by commenting on blogs.
- **Blog Previews :** View blog summaries in a card format with a 'Read More' option.
- **User Authentication :** Secure login and signup with Firebase Auth.
- **Real-time Updates :** Firestore ensures real-time data synchronization.


##   🛠 Tech Stack
- **ReactJS :** Front-end library for building the user interface.
- **TailwindCSS :** Utility-first CSS framework for styling.
- **Firestore :** NoSQL database for storing blog data and comments.
- **Quill :** Rich text editor for writing and viewing blogs.
- **Moment.js :** Library for parsing, validating, manipulating, and formatting dates.
- **Firebase Auth :** Authentication system for login and signup.-
## Installation

1. Clone the repository:

```bash
git clone https://github.com/nee1612/BlogSagarepo.git
cd BlogSage
```
2. Install dependencies:
```bash
npm install
```
3. Set up Firebase:
- Create a Firebase project at Firebase Console.
- Add your Firebase configuration to a `.env` file in the root of your project:
```REACT_APP_API_KEY=your-api-key
REACT_APP_AUTH_DOMAIN=your-auth-domain
REACT_APP_PROJECT_ID=your-project-id
REACT_APP_STORAGE_BUCKET=your-storage-bucket
REACT_APP_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_APP_ID=your-app-id
```
4. Start the development server:
```npm start
npm start
```
## Usage

- **View Blogs :** On the homepage, users can see blog previews in a card format.
- **Read More :** Clicking the 'Read More' button will redirect users to the login page if they are not authenticated.
- **Post a Blog :** After logging in, users can create and publish their own blogs.
- **Comment :** Logged-in users can comment on any blog.
