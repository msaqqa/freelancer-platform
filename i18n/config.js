// src/config/languages.ts
import authAr from './locales/ar/auth.json';
import commonAr from './locales/ar/common.json';
import errorMessagesAr from './locales/ar/error-messages.json';
import freelancerCommonAr from './locales/ar/freelancer/common.json';
import freelancerDashboardAr from './locales/ar/freelancer/dashboard.json';
import menuSidebarAr from './locales/ar/freelancer/menu-sidebar.json';
import freelancerPortfolioAr from './locales/ar/freelancer/portfolio.json';
import freelancerProfileAr from './locales/ar/freelancer/profile.json';
import freelancerServicesAr from './locales/ar/freelancer/services.json';
import privacyPolicyAr from './locales/ar/privacy-policy.json';
import requiredDataAr from './locales/ar/required-data.json';
import validationAr from './locales/ar/validation.json';
import authEn from './locales/en/auth.json';
import commonEn from './locales/en/common.json';
import errorMessagesEn from './locales/en/error-messages.json';
import freelancerCommonEn from './locales/en/freelancer/common.json';
import freelancerDashboardEn from './locales/en/freelancer/dashboard.json';
import menuSidebarEn from './locales/en/freelancer/menu-sidebar.json';
import freelancerPortfolioEn from './locales/en/freelancer/portfolio.json';
import freelancerProfileEn from './locales/en/freelancer/profile.json';
import freelancerServicesEn from './locales/en/freelancer/services.json';
import privacyPolicyEn from './locales/en/privacy-policy.json';
import requiredDataEn from './locales/en/required-data.json';
import validationEn from './locales/en/validation.json';

export const I18N_LANGUAGES = [
  {
    code: 'en',
    name: 'English',
    shortName: 'EN',
    direction: 'ltr',
    flag: '/media/flags/united-states.svg',
  },
  {
    code: 'ar',
    name: 'Arabic',
    shortName: 'AR',
    direction: 'rtl',
    flag: '/media/flags/saudi-arabia.svg',
  },
];

export const I18N_RESOURCES = {
  en: {
    common: commonEn,
    auth: authEn,
    requiredData: requiredDataEn,
    freelancerProfile: freelancerProfileEn,
    freelancerCommon: freelancerCommonEn,
    freelancerDashboard: freelancerDashboardEn,
    portfolio: freelancerPortfolioEn,
    menuSidebar: menuSidebarEn,
    validation: validationEn,
    errorMessages: errorMessagesEn,
    privacyPolicy: privacyPolicyEn,
    services: freelancerServicesEn,
  },
  ar: {
    common: commonAr,
    auth: authAr,
    requiredData: requiredDataAr,
    freelancerProfile: freelancerProfileAr,
    freelancerCommon: freelancerCommonAr,
    freelancerDashboard: freelancerDashboardAr,
    portfolio: freelancerPortfolioAr,
    menuSidebar: menuSidebarAr,
    validation: validationAr,
    errorMessages: errorMessagesAr,
    privacyPolicy: privacyPolicyAr,
    services: freelancerServicesAr,
  },
};
