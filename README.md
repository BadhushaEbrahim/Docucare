# Docucare

<img src="https://res.cloudinary.com/di99qdkb5/image/upload/v1698405584/logos/logo_xhn9wi.png" alt="Docucare Logo" width="200">

Docucare is a virtual healthcare application that allows patients to connect with healthcare professionals through real-time chat and video calls. This README provides an overview of the application and its modules.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Modules](#modules)
- [Getting Started](#getting-started)
- [Contribute](#contribute)
- [License](#license)

## Overview

Docucare is designed to facilitate remote healthcare services. It offers real-time communication between patients and healthcare providers through chat and video calls, making it easy for users to connect with healthcare professionals from the comfort of their own homes.

## Features

- **User Module**
  - User registration
  - Doctor availability check
  - Appointment booking based on user preferences

- **Doctor Module**
  - Doctor registration
  - Set available date and time
  - View appointment schedule

- **Admin Module**
  - Doctor and user management
  - View all appointments
  - Monthly income tracking

- **Real-time Chat and Video Call**
  - Seamless communication using Socket.IO for chat
  - Zego-Cloud API for video calls

## Technologies Used

- Frontend: React.js, Redux
- Backend: Express.js, Node.js
- Database: MongoDB
- Real-time Communication: Socket.IO
- Authentication: JWT
- Cloud Services: Firebase, AWS (EC2), Nginx, Cloudinary
- Payment Integration: Razorpay

## Modules

1. **User Module**: Allows patients to register, check doctor availability, and book appointments based on their preferences.

2. **Doctor Module**: Enables doctors to register, set their available date and time, and view their appointment schedule.

3. **Admin Module**: Provides control over doctor and user management, allows admins to view all appointments, and access a monthly income graph to track total income.

4. **Real-time Chat and Video Call**: Utilizes Socket.IO for real-time chat and the Zego-Cloud API for video calls to facilitate seamless communication between users and doctors.

## Getting Started

To get started with Docucare, follow these steps:

1. Clone this repository to your local machine.
2. Set up the frontend and backend environment as per the provided instructions.
3. Configure your Firebase and AWS settings.
4. Install the required dependencies.
5. Run the application.

Detailed instructions can be found in the project documentation.

## Contribute

We welcome contributions from the community. If you would like to contribute to this project, please review our [Contribution Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to update and customize this README with your project-specific information, and add links to relevant documentation, demo videos, and live application links if available. A well-organized and stylish README can make your project more appealing to users and potential contributors.
