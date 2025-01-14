
# LINK TO GITHUB
https://github.com/RahulMisra2000/material-dashboard-react


# PROJECTS USED
There are links to these under publicuser2000@gmail.com's Chrome bookmark called Work/Projects
Google Cloud Project (Because users will be signing on using Google)
Firebase Project (to host the md react app in the cloud)
Supabase Project ( for Authentication and Database module)


# COMMANDS
firebase projects:list  will list all the firebase projects under the gmail account you are currently signed in. The current one will be marked current.
If you want to make another one current you will do firebase use --add


# HOW TO DEPLOY THIS APP TO FIREBASE HOSTING
This app is connected to a firebase project under Google account publicuser2000@gmail.com
1.  Do a Production Build by doing 'npm run build'
2.  Check who is logged in by doing 'firebase login:list'
    If it is not publicuser2000@gmail.com then switch to that account by doing 'firebase logout' and then do 'firebase login' and select publicuser2000@gmail.com
3.  Deploy to Firebase hosting by doing 'firebase deploy'


# DATABASE
Typically we create some backend service using eg. Express which exposes REST endpoints for Authentication and others for CRUD requests to a backend database. It may do authentication itself or may use an external Auth Provider. Then Express does authorization and then CRUD against a database like mysql. Express is on the server and can therefore hold on to mysql passwords and other sensitive info.

BUT NOW, we have BaaS (Backend as a Service) such as Firebase, Supabase, etc. Here we don't have to worry about the above. They provide, Authentication Module, Database module, Storage module, etc. In order to use their Database and Storage module, we need to use their Authentication module because the Database and Storage security is handled by Rules defined in the BaaS and these rules have access to auth tokens when client apps make CRUD requests to the Database or Storage module. Firebase has a nosql database called Firestore and Supabase uses a sql database called Progress.

In this React app, I was first using Firestore authentication and Firestore Database. Later I found out about Supabase's sql-like Progress database. So, I have commented out the Firestore authentication code and Firestore Database CRUD code and instead I am using Supabase's authentication and database.

I am only using Firebase's Hosting module because Supabase does not support Hosting. That is why the URL for hosting is https://first-firebase-project-16d9e.web.app/ because when I first created the Firebase project I didn't realize that some names that were chosen at that time cannot be modified later. The web.app part at the end is fixed but the first part was my discretion and I did not chose a good name.

# AUTHENTICATION IN SUPABASE
Supabase supports email/pwd and also social media authentication like Google, Facebook, etc. 
I have enabled only Google Authentication in Supabase dashboard.
In the Google Cloud Project https://console.cloud.google.com/apis/credentials?project=hidden-marker-443816-m6 I created oAuth 2 Client Ids because Supabase's Google Provider https://supabase.com/dashboard/project/azqvskvdggwyqdlbpjda/auth/providers requires it.



# [Material Dashboard 2 React](http://demos.creative-tim.com/material-dashboard-react/#/dashboard?ref=readme-mdr) [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social&logo=twitter)](https://twitter.com/intent/tweet?url=https://www.creative-tim.com/product/material-dashboard-react&text=Check%20Material%20Dashboard%202%20react%20made%20by%20@CreativeTim%20#webdesign%20#dashboard%20#materialdesign%20#react%20https://www.creative-tim.com/product/material-dashboard-react)

![version](https://img.shields.io/badge/version-2.2.0-blue.svg) [![GitHub issues open](https://img.shields.io/github/issues/creativetimofficial/material-dashboard-react.svg)](https://github.com/creativetimofficial/material-dashboard-react/issues?q=is%3Aopen+is%3Aissue) [![GitHub issues closed](https://img.shields.io/github/issues-closed-raw/creativetimofficial/material-dashboard-react.svg)](https://github.com/creativetimofficial/material-dashboard-react/issues?q=is%3Aissue+is%3Aclosed)

![Image](https://s3.amazonaws.com/creativetim_bucket/products/71/original/material-dashboard-react.jpg?1638950990)

Material Dashboard 2 React is our newest free MUI Admin Template based on React. If you’re a developer looking to create an admin dashboard that is developer-friendly, rich with features, and highly customisable, here is your match. Our innovative MUI & React dashboard comes with a beautiful design inspired by Google's Material Design and it will help you create stunning websites & web apps to delight your clients.

**Fully Coded Elements**
Material Dashboard 2 React is built with over 70 frontend individual elements, like buttons, inputs, navbars, nav tabs, cards, or alerts, giving you the freedom of choosing and combining. All components can take variations in color, which you can easily modify using MUI styled() API and sx prop. You will save a lot of time going from prototyping to full-functional code because all elements are implemented.

This free MUI & React Dashboard is coming with prebuilt design blocks, so the development process is seamless,
switching from our pages to the real website is very easy to be done.

Special thanks go to:

- [Nepcha Analytics](https://nepcha.com?ref=readme) for the analytics tool. Nepcha is already integrated with Material Dashboard React. You can use it to gain insights into your sources of traffic.

**Documentation built by Developers**

Each element is well presented in very complex documentation.

You can read more about the [documentation here](https://www.creative-tim.com/learning-lab/react/overview/material-dashboard/).

**Example Pages**

If you want to get inspiration or just show something directly to your clients, you can jump-start your development with our pre-built example pages. You will be able to quickly set up the basic structure for your web project.

View [example pages here](https://demos.creative-tim.com/material-dashboard-react/#/dashboard).

**HELPFUL LINKS**

- View [Github Repository](https://github.com/creativetimofficial/material-dashboard-react)
- Check [FAQ Page](https://www.creative-tim.com/faq)

#### Special thanks

During the development of this dashboard, we have used many existing resources from awesome developers. We want to thank them for providing their tools open source:

- [MUI](https://mui.com/) - The React UI library for faster and easier web development.
- [React ChartJS 2](http://reactchartjs.github.io/react-chartjs-2/#/) - Simple yet flexible React charting for designers & developers.
- [ChromaJS](https://gka.github.io/chroma.js/) - A small-ish zero-dependency JavaScript library for all kinds of color conversions and color scales.

Let us know your thoughts below. And good luck with development!

## Table of Contents

- [Versions](#versions)
- [Demo](#demo)
- [Quick Start](#quick-start)
- [Deploy](#deploy)
- [Documentation](#documentation)
- [File Structure](#file-structure)
- [Browser Support](#browser-support)
- [Resources](#resources)
- [Reporting Issues](#reporting-issues)
- [Technical Support or Questions](#technical-support-or-questions)
- [Licensing](#licensing)
- [Useful Links](#useful-links)

## Versions

[<img src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/react-logo.png?raw=true" width="60" height="60" />](https://www.creative-tim.com/product/material-dashboard-react?ref=readme-mdr)

| React |
| ----- |

| [![Material Dashboard React](https://s3.amazonaws.com/creativetim_bucket/products/71/thumb/material-dashboard-react.jpg?1638950990)](http://demos.creative-tim.com/material-dashboard-react/#/dashboard?ref=readme-mdr)

## Demo

- [Dashboard](http://demos.creative-tim.com/material-dashboard-react/#/dashboard?ref=readme-sudr)
- [Profile](https://demos.creative-tim.com/material-dashboard-react/#/profile?ref=readme-sudr)
- [RTL](https://demos.creative-tim.com/material-dashboard-react/#/rtl?ref=readme-sudr)
- [Sign In](https://demos.creative-tim.com/material-dashboard-react/#/authentication/sign-in?ref=readme-sudr)
- [Sign Up](https://demos.creative-tim.com/material-dashboard-react/#/authentication/sign-up?ref=readme-sudr)

[View More](https://demos.creative-tim.com/material-dashboard-react/#/dashboard?ref=readme-mdr).

## Quick start

Quick start options:

- Download from [Creative Tim](https://www.creative-tim.com/product/material-dashboard-react?ref=readme-mdr).

## Terminal Commands

1. Download and Install NodeJs LTS version from [NodeJs Official Page](https://nodejs.org/en/download/).
2. Navigate to the root ./ directory of the product and run `yarn install` or `npm install` to install our local dependencies.

## Deploy

:rocket: You can deploy your own version of the template to Genezio with one click:

[![Deploy to Genezio](https://raw.githubusercontent.com/Genez-io/graphics/main/svg/deploy-button.svg)](https://app.genez.io/start/deploy?repository=https://github.com/creativetimofficial/material-dashboard-react&utm_source=github&utm_medium=referral&utm_campaign=github-creativetim&utm_term=deploy-project&utm_content=button-head)

## Documentation

The documentation for the Material Dashboard is hosted at our [website](https://www.creative-tim.com/learning-lab/react/overview/material-dashboard/?ref=readme-mdr).

### What's included

Within the download you'll find the following directories and files:

```
material-dashboard-react
    ├── public
    │   ├── apple-icon.png
    │   ├── favicon.png
    │   ├── index.html
    │   ├── manifest.json
    │   └── robots.txt
    ├── src
    │   ├── assets
    │   │   ├── images
    │   │   └── theme
    │   │       ├── base
    │   │       ├── components
    │   │       ├── functions
    │   │       ├── index.js
    │   │       └── theme-rtl.js
    │   │   └── theme-dark
    │   │       ├── base
    │   │       ├── components
    │   │       ├── functions
    │   │       ├── index.js
    │   │       └── theme-rtl.js
    │   ├── components
    │   │   ├── MDAlert
    │   │   ├── MDAvatar
    │   │   ├── MDBadge
    │   │   ├── MDBox
    │   │   ├── MDButton
    │   │   ├── MDInput
    │   │   ├── MDPagination
    │   │   ├── MDProgress
    │   │   ├── MDSnackbar
    │   │   └── MDTypography
    │   ├── context
    │   ├── examples
    │   │   ├── Breadcrumbs
    │   │   ├── Cards
    │   │   ├── Charts
    │   │   ├── Configurator
    │   │   ├── Footer
    │   │   ├── Items
    │   │   ├── LayoutContainers
    │   │   ├── Lists
    │   │   ├── Navbars
    │   │   ├── Sidenav
    │   │   ├── Tables
    │   │   └── Timeline
    │   ├── layouts
    │   │   ├── authentication
    │   │   ├── billing
    │   │   ├── dashboard
    │   │   ├── notifications
    │   │   ├── profile
    │   │   ├── rtl
    │   │   └── tables
    │   ├── App.js
    │   ├── index.js
    │   └── routes.js
    ├── .eslintrc.json
    ├── .prettierrc.json
    ├── CHANGELOG.md
    ├── ISSUE_TEMPLATE.md
    ├── jsconfig.json
    ├── LICENSE.md
    ├── package.json
    └── README.md
```

## Browser Support

At present, we officially aim to support the last two versions of the following browsers:

<img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/chrome.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/firefox.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/edge.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/safari.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/opera.png" width="64" height="64">

## Resources

- [Live Preview](https://demos.creative-tim.com/material-dashboard-react/#/dashboard?ref=readme-mdr)
- [Download Page](https://www.creative-tim.com/product/material-dashboard-react?ref=readme-mdr)
- Documentation is [here](https://www.creative-tim.com/learning-lab/react/overview/material-dashboard/?ref=readme-mdr)
- [License Agreement](https://www.creative-tim.com/license?ref=readme-mdr)
- [Support](https://www.creative-tim.com/contact-us?ref=readme-mdr)
- Issues: [Github Issues Page](https://github.com/creativetimofficial/material-dashboard-react/issues)
- [Nepcha Analytics](https://nepcha.com?ref=readme) - Analytics tool for your website

## Reporting Issues

We use GitHub Issues as the official bug tracker for the Material Dashboard React. Here are some advices for our users that want to report an issue:

1. Make sure that you are using the latest version of the Material Dashboard React. Check the CHANGELOG from your dashboard on our [website](https://www.creative-tim.com/product/material-dashboard-react?ref=readme-mdr).
2. Providing us reproducible steps for the issue will shorten the time it takes for it to be fixed.
3. Some issues may be browser specific, so specifying in what browser you encountered the issue might help.

## Technical Support or Questions

If you have questions or need help integrating the product please [contact us](https://www.creative-tim.com/contact-us?ref=readme-mdr) instead of opening an issue.

## Licensing

- Copyright 2023 [Creative Tim](https://www.creative-tim.com?ref=readme-mdr)
- Creative Tim [license](https://www.creative-tim.com/license?ref=readme-mdr)

## Useful Links

- [More products](https://www.creative-tim.com/templates?ref=readme-mdr) from Creative Tim

- [Tutorials](https://www.youtube.com/channel/UCVyTG4sCw-rOvB9oHkzZD1w)

- [Freebies](https://www.creative-tim.com/bootstrap-themes/free?ref=readme-mdr) from Creative Tim

- [Affiliate Program](https://www.creative-tim.com/affiliates/new?ref=readme-mdr) (earn money)

##### Social Media

Twitter: <https://twitter.com/CreativeTim>

Facebook: <https://www.facebook.com/CreativeTim>

Dribbble: <https://dribbble.com/creativetim>

Google+: <https://plus.google.com/+CreativetimPage>

Instagram: <https://instagram.com/creativetimofficial>
