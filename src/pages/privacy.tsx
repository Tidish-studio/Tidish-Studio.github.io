import { Card, CardContent } from "@/components/ui/card";

export default function Privacy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

          <div className="prose dark:prose-invert">
            <p>
              Tidish-Studio built the DnD Spells 5e app as a free app. This service is provided by Tidish-Studio at no cost and is intended for use as is.
            </p>
            <p>
              This page explains what information the app handles, who receives it, and the choices you have. If you use the app, you agree to the
              handling of information described here. I will not use or share your information with anyone except as described in this policy.
            </p>

            <h2>The short version</h2>
            <ul>
              <li>The app has no accounts and no sign-in. I run no server and receive no copy of your spellbooks.</li>
              <li>Your spellbooks, prepared spells, spell slots, labels and settings stay on your device.</li>
              <li>The app shows ads through Google AdMob. Where the law requires it, you can choose whether ads may be personalized, and change your answer later.</li>
              <li>The app sends crash reports to Firebase Crashlytics. You can ask me to delete the ones your device sent.</li>
              <li>If you choose to report a bug or leave feedback from the app, what you write and a few app details are stored in Google Firebase so I can read it. A bug report can also carry your email address, if you give one, so I can reply. You can ask me to delete either.</li>
            </ul>

            <h2>Data stored on your device</h2>
            <p>
              Your spellbooks, prepared spells, spell slots, favorites, labels, tabs, any spells you import, and the app&apos;s settings are stored in the
              app&apos;s private storage on your device. This data is not sent to me. Removing the app removes it.
            </p>
            <p>
              <strong>Backups you make.</strong> In Settings, Backup &amp; Restore writes one file containing your spellbooks and spells (including prepared spells, spell
              slots, labels, tabs and any spells you imported), but not the app&apos;s settings. You choose where that file is saved, and restoring reads a file you choose. I never receive these files; where they go afterwards depends on the place you
              saved them.
            </p>
            <p>
              <strong>Android device backup.</strong> Android can back up app data to your Google account as part of its own device backup (shown in
              your phone as Backup by Google One). The app allows this. Google controls that backup and your account settings turn it on or off. I
              cannot see or read it.
            </p>

            <h2>Ads (Google AdMob)</h2>
            <p>
              The app is free and shows ads using Google AdMob: a banner on some pages, and an optional ad you can watch for a period without banner
              ads. Google collects and processes information to serve and measure these ads, such as your device&apos;s advertising ID, IP address,
              device and app information, and how you interact with ads. Ads may be personalized, based on your advertising ID and your activity, or
              non-personalized.
            </p>
            <p>
              <strong>Your choice.</strong> If you are in the European Economic Area, the United Kingdom or Switzerland, the app asks you on
              launch, in a message provided by Google, whether ads may use your information for personalization. If you are in a US state with a
              privacy law that gives you the right, you can opt out of personalized ads in a message provided by Google. In both cases you open
              that message, and change your answer at any time, in Settings, under Privacy, with &quot;Privacy options&quot;. That row appears
              only where the law requires the choice. Everywhere else ads may be personalized.
            </p>
            <p>
              Independently of the app, you can reset or delete your advertising ID, or opt out of ads personalization, in your Android device
              settings (usually under Privacy, then Ads).
            </p>
            <p>
              Buying &quot;Remove ads&quot; or watching an ad for an ad-free period stops banner ads from being shown. See the Google links below for
              how Google handles data.
            </p>

            <h2>Crash reports (Firebase Crashlytics)</h2>
            <p>
              When the app crashes, it can send a crash report to Firebase Crashlytics, a Google service, so I can find and fix the problem. The app
              sends these reports whenever it can, and there is no switch to turn them off. A report contains the technical details of the crash (the stack trace), your device model, Android version, app
              version, the state of the device at the time (such as free memory and storage), and a Firebase installation ID that identifies the app
              installation, not you. The app adds three details to each report: which ruleset you use (2014 or 2024), how many sources you have
              enabled, and how many spellbooks you have. The app attaches no personal details such as your name or email address. The error messages in a report are technical and may
              occasionally include a fragment of spell data, for example when an imported file cannot be read.
            </p>
            <p>
              <strong>Deleting your crash data.</strong> At the bottom of Settings the app shows its contact email on the left and an App ID on the
              right (tap either to copy it). The App ID is the Firebase installation ID attached to your crash reports. To have the crash data your
              device sent deleted, email me at tidishstudio@gmail.com with that App ID, and I will delete the data for that installation. Otherwise
              Crashlytics keeps reports for 90 days and then deletes them.
            </p>

            <h2>Bug reports and feedback you send (Cloud Firestore)</h2>
            <p>
              The app has two forms. Nothing is sent from either unless you fill it in and press Send.
            </p>
            <p>
              <strong>Report a bug.</strong> Open it from Settings, or from the Report button on the message shown when an import of spells fails. A bug
              report contains your message, your email address if you entered one, and three details the app adds: the app version, your Android
              version, and the App ID (the same Firebase installation ID shown at the bottom of Settings and attached to crash reports). When you report
              a failed import, the report also contains the technical error message from that import. It may include a fragment of the file you tried
              to import or its file name. The form lists these details before you send.
            </p>
            <p>
              <strong>Leave feedback.</strong> Open it from Settings or the Remove Ads page. Feedback contains the rating you chose (one of five faces), the parts of
              the app you ticked as liked, your message if you wrote one, and the app version. It carries no email address, no Android version and no App ID, so I cannot reply to it or
              link it to your installation. The rating stays with me: it is not posted to Google Play.
            </p>
            <p>
              I use bug reports only to understand the problem and, if you gave an email address, to reply to you from my own email. The App ID lets me
              match a bug report with crash reports from the same installation. I use feedback only to learn what works and what does not. Both are
              stored in Cloud Firestore, a Google Firebase database, in the European Union. Only I can read them; the app itself cannot read them back,
              and they are not used for ads or shared with anyone.
            </p>
            <p>
              <strong>Deleting what you sent.</strong> Bug reports and feedback are kept until I delete them; there is no automatic expiry. To have your
              bug reports deleted, email me at tidishstudio@gmail.com with the App ID from the bottom of Settings, or the email address you entered in
              the report, and I will delete every report that carries it. Feedback carries neither, so to have it deleted, tell me roughly when you
              sent it and what you wrote, and I will delete what matches.
            </p>

            <h2>Purchases and tips</h2>
            <p>
              Purchases (removing ads) and optional tips are handled by Google Play. I do not receive your payment details. I learn only that a
              purchase happened, through Google Play, so the app can unlock it.
            </p>

            <h2>Other Google services the app uses</h2>
            <ul>
              <li>Google Play: to check whether a newer version of the app is available, and when you choose to rate the app or buy something.</li>
              <li>
                Google Play&apos;s review card: now and then, after you have used the app for a while, the app may ask Google Play to show its own card
                for rating the app. Google decides whether it appears. A rating or review you leave there goes to Google Play under its policy; the app is
                not told whether you rated it or what you wrote.
              </li>
              <li>Google Fonts: the app loads its text font from Google, which means Google receives your IP address when it does.</li>
            </ul>

            <h2>Third-party privacy policies</h2>
            <ul>
              <li>
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Play Services and Google Fonts</a>
              </li>
              <li>
                <a href="https://support.google.com/admob/answer/6128543?hl=en" target="_blank" rel="noopener noreferrer">AdMob</a>
              </li>
              <li>
                <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">How Google uses data from apps that use its services</a>
              </li>
              <li>
                <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer">Firebase, Crashlytics and Cloud Firestore</a>
              </li>
            </ul>

            <h2>Service providers</h2>
            <p>I use the third parties named above to show ads, find crashes, store the bug reports and feedback you send and process purchases. They receive only what they need for that purpose, under their own policies.</p>

            <h2>Your rights (GDPR)</h2>
            <p>
              If you are in the European Economic Area, the United Kingdom or Switzerland, the law gives you rights over personal data held about you.
              I process data on three bases: your consent, for personalized ads, which you can withdraw at any time through Privacy options in Settings;
              my legitimate interest in keeping the app working, for crash reports; and your choice to send it, for bug reports and feedback, which
              you can take back by asking me to delete it. If you object to any of this, email me the App ID shown at the bottom of Settings and I
              will delete that installation&apos;s crash data and bug reports. Feedback is not tied to the App ID; see above for deleting it.
            </p>
            <p>You have the right to:</p>
            <ul>
              <li>ask what personal data is held about you, and get a copy;</li>
              <li>have inaccurate data corrected, or data erased;</li>
              <li>restrict or object to how your data is used;</li>
              <li>receive your data in a portable form;</li>
              <li>withdraw consent you gave earlier; and</li>
              <li>complain to your local data protection authority.</li>
            </ul>
            <p>
              To use any of these, email me at tidishstudio@gmail.com. The app has no accounts. The identifiers in my own records are the Firebase
              installation ID attached to crash reports and bug reports, which I cannot link to a person on my own, and the email address in any bug
              report where you entered one, together with what you wrote. Feedback carries neither. Tell me what
              you are asking and I will explain what I can and cannot find. Data that Google holds as its own controller, such as AdMob&apos;s ad data, is handled by
              Google, and you can use Google&apos;s own tools for it. Google may process data outside your country; see Google&apos;s policies above.
            </p>

            <h2>Your rights in US states</h2>
            <p>
              If you live in a US state with a consumer privacy law, you may have the right to know what personal information is collected, to ask for
              its deletion, and to opt out of its use for targeted advertising. Where this applies, you can opt out in Settings, under Privacy,
              with &quot;Privacy options&quot;. I do not sell personal information for money. You can also email me at
              tidishstudio@gmail.com.
            </p>

            <h2>Security</h2>
            <p>
              I value your trust and use commercially reasonable means to protect information. No method of transmission over the internet or of
              electronic storage is completely secure, so I cannot guarantee absolute security.
            </p>

            <h2>Links to other sites</h2>
            <p>
              The app and this page link to other sites. If you open one, you leave my service. I do not operate those sites, and I strongly advise
              you to read their privacy policies. I have no control over, and take no responsibility for, their content, policies or practices.
            </p>

            <h2>Children&apos;s privacy</h2>
            <p>
              The app does not address anyone under the age of 13. I do not knowingly collect personal information from children under 13. If you
              are a parent or guardian and you know that your child has given me personal information, please contact me so I can take the necessary
              action.
            </p>

            <h2>Changes to this privacy policy</h2>
            <p>
              I may update this policy from time to time. Please review this page periodically. I will post any changes here.
            </p>
            <p>This policy is effective as of 2026-10-28.</p>

            <h2>Contact us</h2>
            <p>If you have any questions or suggestions about this policy, contact me at tidishstudio@gmail.com.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
