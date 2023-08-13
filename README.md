# Semester Project

## Smart Attendance

Smart Attendance System is a web app developed using NEXTJS framework, along with database in MongoDB.

The project includes taking attendance using NFC tags. NFC tags have their unique serial number which can be mapped again different users. So I used NFC tags as the key to attendance marking.

For marking attendance User must first register his NFC, so it can be mapped to his identity.

## Student Side

- User first need to signup to the platform:

![Untitled](Semester%20Project%20c8cbc3263d604c6c97c2286ff695739b/Untitled.png)

- Signup form includes basic info along with roe of the user. According to platform, there are 2 roles user can enrol to:
  - Teacher
  - Student
- After User signs up on the platform, on success user is forwarded to sign in screen. Sign in screen allows user to sign in to the platform using email and password.

![Untitled](Semester%20Project%20c8cbc3263d604c6c97c2286ff695739b/Untitled%201.png)

- When User signs in, the email is verified against database and on success the JWT (JSON Web Token) is generated for session maintenance and sent in response back to client side, which is then saved in **Redux.** On every page render the session is verified using `useApp()` hook. Which allows session to exit on expiry of JWT.
- When user logs in the user data is also fetched and saved in Redux store for later use anywhere.
- When user is successfully signed in, user can see his attendance at home page:

![Untitled](Semester%20Project%20c8cbc3263d604c6c97c2286ff695739b/Untitled%202.png)

- These are attendance marked using NFC tags, there is no manual way yet introduced.
- The other tab is NFC which contains all the logic for initialising `NDEFReader`, And waiting for the user to scan the NFC tag:

![Untitled](Semester%20Project%20c8cbc3263d604c6c97c2286ff695739b/Untitled%203.png)

- Once scanned, if the user is new, it will show register button to register the NFC with the user Identity:

![Untitled](Semester%20Project%20c8cbc3263d604c6c97c2286ff695739b/Untitled%204.png)

- When Registered, if the user himself again scans the NFC, it shows the user his own details:

![Untitled](Semester%20Project%20c8cbc3263d604c6c97c2286ff695739b/Untitled%205.png)

- This is how student side works. It is totally for user management use.

## Teacher’s Side

- On teacher Side when teacher logs in, on home page he is forwarded to create class, and the add students to it as shown below:

![Untitled](Semester%20Project%20c8cbc3263d604c6c97c2286ff695739b/Untitled%206.png)

- In above screenshot, class has been created and is asking the teacher to add students to class.
- Once the student is added to class, Teacher can see his students in Students tab:

![Untitled](Semester%20Project%20c8cbc3263d604c6c97c2286ff695739b/Untitled%207.png)

- The other tab of teacher is NFC, where all the attendance marking happens:

![Untitled](Semester%20Project%20c8cbc3263d604c6c97c2286ff695739b/Untitled%208.png)

- Now this is like the identification Attendance marking point, where every student will touch their card in order to mark their attendance, if they are in the class added by teacher.
- The below screenshot shows Attendance marked when NFC of student is put near automatically. It shows who is the student and marks his attendance:

![Untitled](Semester%20Project%20c8cbc3263d604c6c97c2286ff695739b/Untitled%209.png)

- It automatically detected and marked his attendance:

![Untitled](Semester%20Project%20c8cbc3263d604c6c97c2286ff695739b/Untitled%2010.png)

- we can see him marked present.

## Code

The project is based on NEXTJS app, the index for the NEXTJS App’s `src` folder is:

```bash
|   context
|   |---app.js
|   app
|   |---rootReducer.js
|   |---store.js
|   features
|   |---user
|   |---|---userData.js
|   |---menu
|   |---|---counterSlice.js
|   models
|   |---attendance.js
|   |---user.js
|   |---nfc.js
|   |---class.js
|   styles
|   |---globals.css
|   components
|   |---NavBar
|   |---|---index.js
|   |---Layout
|   |---|---index.js
|   |---shared
|   |---|---snackbar.js
|   |---|---loader.js
|   |---UserMenu
|   |---|---index.js
|   |---Selection
|   |---|---index.js
|   |---Notifications
|   |---|---index.js
|   |---CustomeTable
|   |---|---index.js
|   lib
|   |---db.js
|   pages
|   |---_app.js
|   |---verify-otp.js
|   |---404.js
|   |---index.js
|   |---signin.js
|   |---nfc.js
|   |---signup.js
|   |---api
|   |---|---attendance
|   |---|---|---index.js
|   |---|---classes
|   |---|---|---index.js
|   |---|---|---[classId].js
|   |---|---|---students.js
|   |---|---index.js
|   |---|---user
|   |---|---|---index.js
|   |---|---nfc
|   |---|---|---index.js
|   |---_document.js
|   |---qr.js
```

- The database Tables are:

![Untitled](Semester%20Project%20c8cbc3263d604c6c97c2286ff695739b/Untitled%2011.png)

The schemas for these tables are:

### user

```jsx
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, unique: true },
    password: { type: String, required: true },
    nfc: { type: Boolean, required: true, default: false },
    role: { type: String, enum: ['teacher', 'student'], required: true },
    class: { type: Boolean, required: true, default: false }
  },
  { timestamps: true }
)

export default mongoose.models.User || mongoose.model('User', userSchema)
```

### nfc

```jsx
import mongoose from 'mongoose'

const nfcSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
      unique: true
    },
    serialNumber: { type: String, required: true, unique: true }
  },
  { timestamps: true }
)

export default mongoose.models.NFC || mongoose.model('NFC', nfcSchema)
```

### Attendance

```jsx
import mongoose from 'mongoose'

const attendanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    status: { type: Boolean, default: true },
    date: {
      type: Date,
      default: () => new Date().toJSON().slice(0, 10),
      unique: true
    }
  },
  { timestamps: true }
)

export default mongoose.models.Attendance ||
  mongoose.model('Attendance', attendanceSchema)
```

### class

```jsx
import mongoose from 'mongoose'

const classSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  className: { type: String, required: true }
})

export default mongoose.models.Class || mongoose.model('Class', classSchema)
```

The index for `src/pages` is:

```bash
|   _app.js
|   verify-otp.js
|   404.js
|   index.js
|   signin.js
|   nfc.js
|   signup.js
|   api
|   |---attendance
|   |---|---index.js
|   |---classes
|   |---|---index.js
|   |---|---[classId].js
|   |---|---students.js
|   |---index.js
|   |---user
|   |---|---index.js
|   |---nfc
|   |---|---index.js
|   _document.js
|   qr.js
```

The website is deployed on `[mazeem.me](http://mazeem.me)`, you can visit and live test the app.

Also can find this report on website linked: [https://sweet-backbone-d6e.notion.site/Semester-Project-c8cbc3263d604c6c97c2286ff695739b?pvs=25](https://www.notion.so/Semester-Project-c8cbc3263d604c6c97c2286ff695739b?pvs=21)
