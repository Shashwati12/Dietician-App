# 🥗 Dietician App (Ayuratna)

A cross-platform **React Native + Expo** application designed for **Ayurvedic practitioners and dieticians** to manage patients, appointments, and analytics through a clean and scalable interface.

This project demonstrates real-world mobile application architecture using **Expo Router**, with support for **Android, iOS, and Web**.

---

## 🚀 Features

### 🔐 Authentication
- Signup and Login flows
- Client-side validation
- Persistent local authentication state
- Cross-platform storage support

### 🏠 Dashboard
- Entry point after authentication
- Quick access to core features

### 📅 Appointments
- View daily appointments
- Supports video, voice, and in-person consultations
- Appointment booking modal
- Status tracking (scheduled, completed, cancelled)

### 👥 Patients
- Patient list with search functionality
- Dosha-based classification (Vata, Pitta, Kapha, Mixed)
- Patient detail modal
- Active / inactive patient status

### 📊 Analytics
- Practice performance metrics
- Patient constitution distribution
- Treatment effectiveness overview
- Actionable insights for practitioners

### 👤 Profile
- Doctor profile overview
- App preferences and settings
- Logout flow placeholder

### 🌐 Web Support
- Fully functional on web using Expo
- Platform-aware storage handling

---

## 🧠 Tech Stack

- React Native
- Expo (SDK 54)
- Expo Router (file-based routing)
- TypeScript
- Lucide React Native (icons)
- AsyncStorage (mobile)
- localStorage (web)

---

## 🗂️ Project Structure

app/
├── _layout.tsx
├── index.tsx
├── welcome.tsx
├── login.tsx
├── signup.tsx
├── +not-found.tsx
│
├── (tabs)/
│ ├── _layout.tsx
│ ├── index.tsx
│ ├── appointments.tsx
│ ├── patients.tsx
│ ├── analytics.tsx
│ └── profile.tsx
│
utils/
├── storage.ts
│
hooks/
├── useFrameworkReady.ts


---

## 🧭 Navigation Architecture

- Stack navigation for authentication and global screens
- Tab-based navigation for post-login flows
- File-based routing using Expo Router
- Typed routes enabled for better safety

---

## 💾 Data Handling

- Local mock data for demo purposes
- Platform-aware storage abstraction:
  - AsyncStorage on mobile
  - localStorage on web
- Designed for easy backend integration

---

## 🎯 Design Philosophy

- Clean and consistent UI
- Data-driven components
- Scalable and modular architecture
- Minimal dependencies for better performance
- Ready for production extension

---

## 🧪 Getting Started

### Install dependencies
```bash
npm install
```
### Start the development server
```
npx expo start
```

### Run on platforms

- Mobile: Scan QR using Expo Go

- Web: Press w in the Expo CLI

## 🔮 Future Enhancements

- Backend integration (Node.js / Firebase / Supabase)

- Secure authentication (JWT / OAuth)

- Role-based access control

- Real-time updates

- Push notifications

- Advanced analytics visualizations

- Dark mode support
