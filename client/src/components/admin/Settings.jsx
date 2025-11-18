import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'

const Settings = () => {
  const [activeSection, setActiveSection] = useState('preferences')
  const [selectedTheme, setSelectedTheme] = useState('light')
  const [dateFormat, setDateFormat] = useState('MM:DD:YY')
  const [language, setLanguage] = useState('English (US)')
  const [isDateFormatOpen, setIsDateFormatOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const dateFormatRef = useRef(null)
  const languageRef = useRef(null)

  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    email1: { enabled: true, items: [true, false, false] },
    email2: { enabled: true, items: [true, false, false] },
    email3: { enabled: false, items: [false, false, false] }
  })

  // Account Security settings state
  const [isEditingEmail, setIsEditingEmail] = useState(false)
  const [email, setEmail] = useState('admin@example.com')
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [devices] = useState([
    { id: 1, browser: 'Chrome', location: 'Berlin, DE', lastSeen: '2 Month Ago' },
    { id: 2, browser: 'Chrome', location: 'Berlin, DE', lastSeen: '2 Month Ago' },
    { id: 3, browser: 'Chrome', location: 'Berlin, DE', lastSeen: '2 Month Ago' }
  ])

  // Store original values for cancel functionality
  const [originalSettings, setOriginalSettings] = useState({
    theme: 'light',
    dateFormat: 'MM:DD:YY',
    language: 'English (US)'
  })

  const handleSave = () => {
    // Save settings (you can add API call here)
    setOriginalSettings({
      theme: selectedTheme,
      dateFormat: dateFormat,
      language: language
    })
    // You can add toast notification or success message here
    console.log('Settings saved:', { selectedTheme, dateFormat, language })
  }

  const handleCancel = () => {
    // Reset to original values
    setSelectedTheme(originalSettings.theme)
    setDateFormat(originalSettings.dateFormat)
    setLanguage(originalSettings.language)
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dateFormatRef.current && !dateFormatRef.current.contains(event.target)) {
        setIsDateFormatOpen(false)
      }
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setIsLanguageOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const dateFormats = ['MM:DD:YY', 'DD:MM:YY', 'YY:MM:DD', 'MM/DD/YYYY', 'DD/MM/YYYY']
  const languages = ['English (US)', 'English (UK)', 'Spanish', 'French', 'German', 'Hindi']

  // Section titles and subtitles
  const sectionInfo = {
    preferences: {
      title: 'Preferences',
      subtitle: 'Customize preferences for a better dashboard experience.'
    },
    notification: {
      title: 'Notification',
      subtitle: 'Customize preferences for a better dashboard experience.'
    },
    security: {
      title: 'Account Security',
      subtitle: 'Manage your account security settings.'
    }
  }

  const currentSection = sectionInfo[activeSection] || sectionInfo.preferences

  const SettingsNavItem = ({ label, section, isActive, onClick }) => {
    return (
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded cursor-pointer transition-colors ${
          isActive
            ? 'bg-light text-green'
            : 'text-darkGray hover:bg-light'
        }`}
        onClick={onClick}
      >
        <img
          src={
            isActive
              ? '/assets/partnerDashboard/greenuser.svg'
              : '/assets/partnerDashboard/user.svg'
          }
          alt="user"
          className="w-5 h-5"
        />
        <h3 className="text-base font-medium">{label}</h3>
      </div>
    )
  }

  const ThemeCard = ({ theme, label, isSelected, onClick }) => {
    const isLight = theme === 'light'
    
    return (
      <div
        className="relative cursor-pointer transition-all"
        onClick={onClick}
      >
        <div
          className={`rounded-lg p-1 h-32 w-40 border ${
            isSelected ? 'border-green' : 'border-gray-300'
          }`}
        >
          {/* Browser window preview */}
          <div
            className={`rounded h-full overflow-hidden ${
              isLight
                ? 'bg-white border border-gray-200'
                : 'bg-[#1e293b] border border-gray-700'
            }`}
          >
            {/* Window controls */}
            <div className={`flex gap-1.5 p-2 border-b ${
              isLight ? 'border-gray-200' : 'border-gray-700'
            }`}>
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            
            {/* Browser content with sidebar */}
            <div className="flex h-20">
              {/* Left sidebar */}
              <div
                className={`w-1/4 ${
                  isLight ? 'bg-gray-100' : 'bg-gray-800'
                }`}
              ></div>
              
              {/* Main content area with lines */}
              <div className="flex-1 p-2">
                <div
                  className={`h-1.5 rounded mb-2 ${
                    isLight ? 'bg-gray-200' : 'bg-gray-600'
                  }`}
                ></div>
                <div
                  className={`h-1.5 rounded mb-2 w-4/5 ${
                    isLight ? 'bg-gray-200' : 'bg-gray-600'
                  }`}
                ></div>
                <div
                  className={`h-1.5 rounded mb-2 w-3/5 ${
                    isLight ? 'bg-gray-200' : 'bg-gray-600'
                  }`}
                ></div>
                <div
                  className={`h-1.5 rounded w-5/6 ${
                    isLight ? 'bg-gray-200' : 'bg-gray-600'
                  }`}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center mt-2 text-sm font-medium text-darkGray">{label}</p>
      </div>
    )
  }

  return (
    <div className="w-full">
  

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200">
    {/* Header */}
    <div className="flex justify-between items-start mb-8 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-darkGray mb-2">Settings</h1>
          <p className="text-sm text-darkGray">
            Customize until match to your workflow
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleCancel}
            className="px-6 py-2.5 border border-gray-300 rounded-lg bg-white text-darkGray font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-6 py-2.5 bg-green rounded-lg text-white font-medium hover:bg-darkGreen transition-colors"
          >
            Save
          </button>
        </div>
      </div>


        <div className="flex gap-4 w-full">


     {/* Settings-Specific Left Sidebar Navigation */}
     <div className="w-64 h-min border-r-2 border-gray-200 p-6 flex flex-col gap-2 shrink-0">
        <SettingsNavItem
          label="Preferences"
          section="preferences"
          isActive={activeSection === 'preferences'}
          onClick={() => setActiveSection('preferences')}
        />
        <SettingsNavItem
          label="Notification"
          section="notification"
          isActive={activeSection === 'notification'}
          onClick={() => setActiveSection('notification')}
        />
        <SettingsNavItem
          label="Account Security"
          section="security"
          isActive={activeSection === 'security'}
          onClick={() => setActiveSection('security')}
        />
      </div>




<div className='w-full'>
  
          {/* Preferences Section */}
          {activeSection === 'preferences' && (
            <div className="px-4">
              <div className="mb-8 border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-bold text-darkGray mb-2">Preferences</h2>
                <p className="text-sm text-darkGray">
                  Customize preferences for a better dashboard experience.
                </p>
              </div>

            {/* Select Theme */}
            <div className="mb-8">
              <h3 className="text-base font-semibold text-darkGray mb-4">Select Theme</h3>
              <div className="flex gap-6">
                <ThemeCard
                  theme="light"
                  label="Light"
                  isSelected={selectedTheme === 'light'}
                  onClick={() => setSelectedTheme('light')}
                />
                <ThemeCard
                  theme="dark"
                  label="Dark"
                  isSelected={selectedTheme === 'dark'}
                  onClick={() => setSelectedTheme('dark')}
                />
              </div>
            </div>

            {/* Change Date Format */}
            <div className="mb-8">
              <h3 className="text-base font-semibold text-darkGray mb-4">Change Date Format</h3>
              <div className="relative w-64" ref={dateFormatRef}>
                <div
                  className="flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors bg-white"
                  onClick={() => {
                    setIsDateFormatOpen(!isDateFormatOpen)
                    setIsLanguageOpen(false)
                  }}
                >
                  <span className="text-darkGray font-medium">{dateFormat}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      isDateFormatOpen ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                {isDateFormatOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                    {dateFormats.map((format) => (
                      <div
                        key={format}
                        className="px-4 py-3 hover:bg-light cursor-pointer text-darkGray font-medium transition-colors"
                        onClick={() => {
                          setDateFormat(format)
                          setIsDateFormatOpen(false)
                        }}
                      >
                        {format}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Change Language */}
            <div>
              <h3 className="text-base font-semibold text-darkGray mb-4">Change language</h3>
              <div className="relative w-64" ref={languageRef}>
                <div
                  className="flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors bg-white"
                  onClick={() => {
                    setIsLanguageOpen(!isLanguageOpen)
                    setIsDateFormatOpen(false)
                  }}
                >
                  <span className="text-darkGray font-medium">{language}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      isLanguageOpen ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                {isLanguageOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                    {languages.map((lang) => (
                      <div
                        key={lang}
                        className="px-4 py-3 hover:bg-light cursor-pointer text-darkGray font-medium transition-colors"
                        onClick={() => {
                          setLanguage(lang)
                          setIsLanguageOpen(false)
                        }}
                      >
                        {lang}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Notification Section */}
        {activeSection === 'notification' && (
          <div className="px-4">
            <div className="mb-8 border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-bold text-darkGray mb-2">Notification</h2>
              <p className="text-sm text-darkGray">
                Customize preferences for a better dashboard experience.
              </p>
            </div>

            {/* Email Notification Blocks */}
            <div className="space-y-6">
              {/* First Email Notification Block */}
              <div className=" p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-darkGray mb-2">Email Notification</h3>
                    <p className="text-xs text-darkGray">
                      Easily manage your email notifications and choose which updates matter most to you.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer ml-4">
                    <input
                      type="checkbox"
                      checked={notificationSettings.email1.enabled}
                      onChange={(e) => {
                        setNotificationSettings(prev => ({
                          ...prev,
                          email1: { ...prev.email1, enabled: e.target.checked }
                        }))
                      }}
                      className="sr-only peer"
                    />
                    <div className={`w-11 h-6 rounded-full peer transition-colors ${
                      notificationSettings.email1.enabled ? 'bg-blue' : 'bg-gray-300'
                    } peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${
                      notificationSettings.email1.enabled ? 'after:translate-x-full' : ''
                    }`}></div>
                  </label>
                </div>
                <div className="space-y-4">
                  {[0, 1, 2].map((index) => (
                    <label key={index} className="flex items-start gap-3 cursor-pointer">
                      <div className="relative mt-0.5">
                        <input
                          type="checkbox"
                          checked={notificationSettings.email1.items[index]}
                          onChange={(e) => {
                            const newItems = [...notificationSettings.email1.items]
                            newItems[index] = e.target.checked
                            setNotificationSettings(prev => ({
                              ...prev,
                              email1: { ...prev.email1, items: newItems }
                            }))
                          }}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          notificationSettings.email1.items[index]
                            ? 'bg-green border-green'
                            : 'bg-white border-gray-300'
                        }`}>
                          {notificationSettings.email1.items[index] && (
                            <Check size={14} className="text-white" strokeWidth={3} />
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-darkGray mb-1">Property List</p>
                        <p className="text-xs text-darkGray">
                          Easily manage your email notifications and choose which updates matter most to you.
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Second Email Notification Block */}
              <div className=" p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-darkGray mb-2">Email Notification</h3>
                    <p className="text-xs text-darkGray">
                      Easily manage your email notifications and choose which updates matter most to you.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer ml-4">
                    <input
                      type="checkbox"
                      checked={notificationSettings.email2.enabled}
                      onChange={(e) => {
                        setNotificationSettings(prev => ({
                          ...prev,
                          email2: { ...prev.email2, enabled: e.target.checked }
                        }))
                      }}
                      className="sr-only peer"
                    />
                    <div className={`w-11 h-6 rounded-full peer transition-colors ${
                      notificationSettings.email2.enabled ? 'bg-blue' : 'bg-gray-300'
                    } peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${
                      notificationSettings.email2.enabled ? 'after:translate-x-full' : ''
                    }`}></div>
                  </label>
                </div>
                <div className="space-y-4">
                  {[0, 1, 2].map((index) => (
                    <label key={index} className="flex items-start gap-3 cursor-pointer">
                      <div className="relative mt-0.5">
                        <input
                          type="checkbox"
                          checked={notificationSettings.email2.items[index]}
                          onChange={(e) => {
                            const newItems = [...notificationSettings.email2.items]
                            newItems[index] = e.target.checked
                            setNotificationSettings(prev => ({
                              ...prev,
                              email2: { ...prev.email2, items: newItems }
                            }))
                          }}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          notificationSettings.email2.items[index]
                            ? 'bg-green border-green'
                            : 'bg-white border-gray-300'
                        }`}>
                          {notificationSettings.email2.items[index] && (
                            <Check size={14} className="text-white" strokeWidth={3} />
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-darkGray mb-1">Property List</p>
                        <p className="text-xs text-darkGray">
                          Easily manage your email notifications and choose which updates matter most to you.
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Third Email Notification Block */}
              <div className=" p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-darkGray mb-2">Email Notification</h3>
                    <p className="text-xs text-darkGray">
                      Easily manage your email notifications and choose which updates matter most to you.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer ml-4">
                    <input
                      type="checkbox"
                      checked={notificationSettings.email3.enabled}
                      onChange={(e) => {
                        setNotificationSettings(prev => ({
                          ...prev,
                          email3: { ...prev.email3, enabled: e.target.checked }
                        }))
                      }}
                      className="sr-only peer"
                    />
                    <div className={`w-11 h-6 rounded-full peer transition-colors ${
                      notificationSettings.email3.enabled ? 'bg-blue' : 'bg-gray-300'
                    } peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${
                      notificationSettings.email3.enabled ? 'after:translate-x-full' : ''
                    }`}></div>
                  </label>
                </div>
                <div className="space-y-4">
                  {[0, 1, 2].map((index) => (
                    <label key={index} className="flex items-start gap-3 cursor-pointer">
                      <div className="relative mt-0.5">
                        <input
                          type="checkbox"
                          checked={notificationSettings.email3.items[index]}
                          onChange={(e) => {
                            const newItems = [...notificationSettings.email3.items]
                            newItems[index] = e.target.checked
                            setNotificationSettings(prev => ({
                              ...prev,
                              email3: { ...prev.email3, items: newItems }
                            }))
                          }}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          notificationSettings.email3.items[index]
                            ? 'bg-green border-green'
                            : 'bg-white border-gray-300'
                        }`}>
                          {notificationSettings.email3.items[index] && (
                            <Check size={14} className="text-white" strokeWidth={3} />
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-darkGray mb-1">Property List</p>
                        <p className="text-xs text-darkGray">
                          Easily manage your email notifications and choose which updates matter most to you.
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Account Security Section */}
        {activeSection === 'security' && (
          <div className="px-4">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-darkGray mb-2">Account Security</h2>
              <p className="text-sm text-darkGray">
                Customize preferences for a better dashboard experience.
              </p>
            </div>

            {/* Email Address Section */}
            <div className="mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-darkGray mb-2">Email address</h3>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                    placeholder="Email Address"
                  />
                </div>
                <div className="flex items-center gap-3 mt-8">
                  <button
                    onClick={() => setEmail('admin@example.com')}
                    className="text-blue font-medium hover:underline"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {}}
                    className="bg-blue text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>

            {/* Two-factor authentication */}
            <div className="mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-darkGray mb-2">Two-factor authentication</h3>
                  <p className="text-sm text-darkGray">
                    Use the authentication to get verification codes for better security
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-4">
                  <input
                    type="checkbox"
                    checked={twoFactorEnabled}
                    onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className={`w-11 h-6 rounded-full peer transition-colors ${
                    twoFactorEnabled ? 'bg-blue' : 'bg-gray-300'
                  } peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${
                    twoFactorEnabled ? 'after:translate-x-full' : ''
                  }`}></div>
                </label>
              </div>
            </div>

            {/* Devices And Activities */}
            <div className="mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-darkGray mb-2">Devices And Activities</h3>
                  <p className="text-sm text-darkGray">
                    Please where you're logged into admin login
                  </p>
                </div>
                <button className="text-blue font-medium hover:underline">
                  Sign out All Device
                </button>
              </div>
              <div className="space-y-4">
                {devices.map((device) => (
                  <div key={device.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3">
                      {/* Chrome Icon */}
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
                       <img src="/assets/admin/chrome.svg" alt="chrome" className="w-10 h-10" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-darkGray">{device.browser}</p>
                        <p className="text-xs text-darkGray">
                          Last seen {device.lastSeen} • {device.location}
                        </p>
                      </div>
                    </div>
                    <button className="text-sm text-darkGray hover:text-red-500 transition-colors">
                      Sign out
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Delete Account */}
            <div className="mb-8">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-red-500 mb-2">Delete account</h3>
                  <p className="text-sm text-darkGray">
                    Permanently delete your avenaa account and data.
                  </p>
                </div>
                <button className="bg-red-500 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-red-600 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
