import type en from './en'

const de: typeof en = {
  HomePage: {
    PopularMeasures: 'Beliebte Maßnahmen',
    Login: 'Anmelden',
    SignUp: 'Registrieren',
    MyMeasures: 'Meine Maßnahmen',
    Loading: 'Laden...',
  },
  Search: {
    Placeholder: 'Wählen Sie einen Standort aus...',
    FindSubsidies: 'Finden Sie Subventionen in Ihrer Gegend',
    EnterPostcodeState: 'Geben Sie Ihre Postleitzahl oder Ihr Bundesland ein',
    NoneFound: 'Kein Standort gefunden',
  },
  Navbar: {
    Label: {
      Browse: 'Durchsuchen',
      MyAccount: 'Mein Konto',
      NotificationSettings: 'Benachrichtigungen',
      AdminPortal: 'Admin-Portal',
      Logout: 'Abmelden',
      NoRole: 'Keine Rolle',
    },
    Buttons: {
      BackToSearch: 'Zurück',
      Share: 'Teilen',
      Copied: 'Kopiert!',
      Copy: 'Kopieren',
    },
  },
  Measure: {
    TableHeader: {
      ID: 'ID',
      MeasureIdentifier: 'Maßnahmenkennung',
      Title: 'Titel',
      Actions: 'Aktionen',
      IsPublished: 'Veröffentlicht',
    },
    Button: {
      Archive: 'Archivieren',
      AddSurcharge: 'Zuschlag hinzufügen',
      AddedToShortlist: 'Zur Merkliste hinzugefügt',
      AddToShortlist: 'Zur Merkliste hinzufügen',
      AddTo: 'Hinzufügen zu...',
      Copy: 'Kopieren',
      SetDevValues: 'Testwerte benutzen',
      SaveDraft: 'Entwurf speichern',
      Cancel: 'Abbrechen',
      Publish: 'Veröffentlichen',
      CopyIdToClipBoard: 'ID in die Zwischenablage kopieren',
      Remove: 'Entfernen',
      AddCondition: 'Bedingung hinzufügen',
      AddRestriction: 'Einschränkung hinzufügen',
      AddBenefit: 'Vorteil & Nutzen hinzufügen',
      AddKeyDate: 'Wichtiges Datum hinzufügen',
      AddCombination: 'Kombination hinzufügen',
      AddApplicationStep: 'Bewerbungsschritt hinzufügen',
      OpenMenu: 'Menü öffnen',
      Edit: 'Bearbeiten',
      Delete: 'Löschen',
      Create: 'Erstellen',
      Clear: 'Zurücksetzen',
    },
    Card: {
      Dropdown: {
        None: 'Keine',
        Shortlisted: 'Merkliste',
        Active: 'Aktiv',
        Archived: 'Archiviert',
      },
      DurationDescription: {
        Year_one: '{{count}} Jahr',
        Year_other: '{{count}} Jahre',
      },
    },
    Label: {
      Type: 'Kategorie',
      By: 'Bis',
      From: 'Von',
      Any: 'Beliebig',
      Conventional: 'Konventionell',
      Organic: 'Ökologisch',
      ConventionalSupplement: 'Informationen Zuschlag (konv.)',
      OrganicSupplement: 'Informationen Zuschlag (ökol.)',
      DueBy: 'Bewerben bis',
      Hectare: 'ha',
      MoveToActive: 'Aktivieren',
      ImplementationStart: 'Umsetzungsbeginn',
      Active: 'Aktiv',
      Complete: 'Abgeschlossen',
      CreateNewMeasure: 'Neue Maßnahme erstellen',
      MeasureIdentifier: 'Maßnahmenkennung',
      MeasureTitleLong: 'Maßnahmentitel: Lang *',
      MeasureTitleLongDescription:
        'Ein beschreibender Titel für diese Maßnahme. Dieser wird auf der Maßnahmendetailseite angezeigt.',
      MeasureTitleShort: 'Maßnahmentitel: Kurz *',
      MeasureTitleShortDescription:
        'Ein kurzer Titel für diese Maßnahme. Dieser wird auf der Maßnahmenkarte angezeigt.',
      ProgramTitle: 'Programmtitel *',
      ProgramTitleDescription:
        'Titel des Programms, dem die Maßnahme zugeordnet ist.',
      PublicationDate: 'Veröffentlichungsdatum *',
      PublicationDateDescription:
        'Wann wurden die Maßnahmeninformationen abgerufen?',
      NoSelection: 'Wählen Sie ein Datum',
      PublicationSource: 'Quelle',
      PublicationSourceRequired: 'Quelle *',
      PublicationSourceDescription: 'Woher stammen die Informationen?',
      PublicationSourceLabel: 'Beschreibung der Quelle',
      PublicationSourceLabelDescription:
        'Ein lesbarerer Name für die Quelle, der anstelle der URL angezeigt wird.',
      ApplicationDate: 'Bewerbungsdatum *',
      ApplicationDateDescription:
        'Datum, bis zu dem die Bewerbung eingereicht werden muss.',
      AvailableLand: 'Bundesland',
      AvailableLandDescription:
        'Wählen Sie das Bundesland, in dem die Maßnahme beantragt werden kann.',
      AvailableKreis: 'Kreis',
      AvailableKreisDescription:
        'Wählen Sie den Kreis, in dem die Maßnahme beantragt werden kann.',
      SubsidyValue: 'Förderwert *',
      SubsidyValueDescription: 'Geldbetrag, der beantragt werden kann.',
      MeasureOneValue: 'Die Maßnahme hat einen Wert',
      MeasureMultipleValues: 'Die Maßnahme hat mehrere Werte',
      SubsidyAmount: 'Förderbetrag',
      ConventionalSubsidyAmount: 'Förderbetrag: Konventionell',
      AddSurcharges: 'Zuschläge hinzufügen',
      OrganicSubsidyAmount: 'Förderbetrag: Ökologisch',
      IncludeWarningMessage: 'Warnmeldung einschließen',
      CombinationSurcharges: 'Zuschlägen sind nur bedingt kombinierbar',
      ReadMore: 'Lesen Sie hier mehr.',
      ProviderEmail: 'Kontakt-E-Mail',
      ProviderEmailDescription:
        'Kontakt-E-Mail zur Kontaktaufnahme mit dem Anbieter der Maßnahme.',
      ProviderPhoneNumber: 'Kontakt-Telefonnummer',
      ProviderPhoneNumberDescription:
        'Kontakttelefonnummer des Anbieters oder der Verwaltungsstelle.',
      Effort: 'Aufwand *',
      Renewable: 'Nur Folgeanträge',
      RenewableDescription: 'Nur Folgeanträge',
      RenewableTooltipDescription:
        'Erklären Sie die Folgeanträge der Maßnahme.',
      EffortDescription:
        'Eine Expertenbewertung, wie schwierig die Umsetzung der Maßnahme sein wird.',
      IncludeTooltip: 'Tooltip einschließen',
      Duration: 'Dauer *',
      DurationDescription: 'Wie viele Jahre wird die Maßnahme umgesetzt?',
      Situation: 'Lage *',
      SituationDescription:
        'Ist die Maßnahme an eine Fläche auf dem Betrieb gebunden oder kann sie über den Betrieb rotiert werden?',
      WhatsInvolved: 'Zusammenfassung *',
      WhatsInvolvedDescription:
        'Beschreiben Sie, was bei der Umsetzung dieser Maßnahme involviert ist.',
      CultivationConditions: 'Anbaubedingungen *',
      CultivationConditionsDescription:
        'Was sind die Einschränkungen für den Anbau?',
      PlantProtectionMeasures: 'Pflanzenschutzmaßnahmen',
      PlantProtectionMeasuresDescription:
        'Was sind die Einschränkungen im Pflanzenschutz?',
      Fertilizer: 'Düngemittel',
      FertilizerDescription:
        'Was sind die Einschränkungen für den Düngemitteleinsatz?',
      KeyBenefits: 'Hauptvorteile & Nutzen *',
      KeyBenefitsDescription:
        'Was sind die ökologischen oder wirtschaftlichen Vorteile für den Landwirt?',
      KeyDates: 'Wichtige Termine',
      KeyDatesDescription:
        'Wichtige(s) Datum(en), bis zu dem/denen eine Einschränkung festgelegt ist.',
      KeyDatesTopFieldDescription: 'Wichtiges Datum/Datumsbereich',
      KeyDatesBottomFieldDescription: 'Beschreibung',
      KeyDatesFormat: 'DD/MM/YYYY',
      AreaDetermination: 'Flächenbestimmung',
      AreaDeterminationDescription:
        'Spezifikationen für die zu bestimmende(n) Fläche(n).',
      MaximumOperation: 'Maximaler Betrieb',
      MaximumArea: 'Maximale Fläche',
      MinimumArea: 'Minimale Fläche',
      Form: 'Form',
      Combination: 'Kombinationen *',
      CombinationDescription:
        'Mit welchen anderen Maßnahmen, kann diese Maßnahme kombiniert werden?',
      ApplicationSteps: 'Bewerbungsschritte *',
      ApplicationStepsDescription:
        'Eine Beschreibung der Schritte, die für die Bewerbung für diese Maßnahme erforderlich sind.',
      PublishView: 'Veröffentlichen',
      PublishViewDescription:
        'Hier klicken, um die Maßnahme öffentlich sichtbar zu machen.',
      MakeThisMeasurePublic: 'Maßnahme öffentlich machen',
      Setting: 'Landnutzung *',
      SettingDescription: 'Auf welchem Landtyp ist diese Maßnahme erlaubt?',
      MeasureNotFound: 'Maßnahme nicht gefunden',
      NoTitle: 'Kein Titel',
    },
    Placeholder: {
      EnterLongTitle: 'Langen Titel eingeben',
      ProgramTitle1: 'ABC',
      ProgramTitle2: 'DEF',
      PublicationSource: 'https://www.beispiel.de',
      PublicationSourceLabel: 'Beispiel Name',
      EnterTitle: 'Titel eingeben',
      EnterAmount: 'Betrag eingeben',
      EnterEmailAddress: 'E-Mail-Adresse eingeben',
      EnterPhoneNumber: 'Telefonnummer eingeben',
      ChooseEffortLevel: 'Aufwandsniveau wählen',
      EnterValue: 'Wert eingeben',
      ChooseSetting: 'Einstellung wählen',
      ChooseSituation: 'Lage wählen',
      EnterDescription: 'Beschreibung eingeben',
      Description: 'Beschreibung',
      EnterCondition: 'Bedingung eingeben',
      EnterRestriction: 'Einschränkung eingeben',
      EnterBenefit: 'Vorteil eingeben',
      EnterIdentifier: 'Kennung eingeben',
      TooltipMessage: 'Tooltip-Nachricht',
      AvailableArea: 'Bundesland auswählen',
    },
    Options: {
      Setting: {
        ArableLand: 'Ackerland',
        Grassland: 'Grünland',
        Bog: 'Moor',
        Woodland: 'Wald',
        Special: 'Sonderkulturen',
        Other: 'Sonstiges',
      },
      Situation: {
        Rotating: 'Rotierend',
        WholeFarm: 'Ganzer Betrieb',
        Fixed: 'Lagegenau',
      },
      Combination: {
        Yes: 'Ja, es gibt verfügbare Kombinationen',
        No: 'Keine verfügbaren Kombinationen',
      },
    },
    Tab: {
      Shortlist: 'Merkliste',
      Active: 'Aktiv',
      Archived: 'Archiviert',
      Message: {
        AddShortlist: 'Fügen Sie Ihre erste Maßnahme zur Merkliste hinzu',
        NoActiveMeasures: 'Sie haben keine aktiven Maßnahmen',
        NoArchivedMeasures: 'Sie haben keine archivierten Maßnahmen',
      },
      Action: {
        VisitBrowse: 'Maßnahmen finden',
        AddFromShortlist: 'Aus Merkliste hinzufügen',
        ViewActiveMeasures: 'Aktive Maßnahmen anzeigen',
      },
    },
    Toast: {
      AlreadyExists: 'Maßnahme existiert bereits',
      Cancelled: 'Maßnahme erfolgreich abgebrochen',
      CreationError: 'Fehler beim Erstellen der Maßnahme',
      CreationSuccess: 'Maßnahme erfolgreich erstellt',
      FormSubmissionError: 'Fehler beim Einreichen des Formulars',
      UpdateSuccess: 'Maßnahme erfolgreich aktualisiert',
    },
  },
  Footer: {
    Label: {
      ThankYouPartners: 'Danke an unsere Partner',
      TermsOfService: 'Nutzungsbedingungen',
      PrivacyPolicy: 'Datenschutzrichtlinie',
      PoweredBy: 'Bereitgestellt von:',
    },
  },
  Profile: {
    Details: {
      Label: {
        MyAccount: 'Mein Konto',
        MyProfile: 'Mein Profil',
        PersonalDetails: 'Persönliche Details und Anmeldeeinstellungen',
        Notifications: 'Verwalten Sie Ihre Benachrichtigungen',
        MyFarms: 'Meine Betriebe',
        YouDontHaveAnyFarms: 'Sie haben keine Betriebe',
        DeleteAccount: 'Konto löschen',
        Name: 'Name',
        Email: 'E-Mail',
      },
      Button: {
        BackToAccount: 'Zurück zu meinem Konto',
        Save: 'Speichern',
        Edit: 'Bearbeiten',
        DeleteAccount: 'Konto löschen',
      },
    },
    Notification: {
      Label: {
        Notifications: 'Benachrichtigungen',
        EmailNotifications: 'E-Mail-Benachrichtigungen',
        ReceiveEmails: 'Newsletter Abonieren',
      },
      Toast: {
        Updated: 'Benachrichtigungseinstellungen erfolgreich aktualisiert',
      },
    },
    Farm: {
      Label: {
        NoFarmFound: 'Kein Betrieb gefunden',
        AddAnotherFarm: 'Einen weiteren Betrieb hinzufügen',
        CreateFarm: 'Erstellen Sie Ihren ersten Betrieb',
        NoAnimals: 'Keine Tiere',
      },
    },
  },
  Onboarding: {
    Buttons: {
      Next: 'Weiter',
      Back: 'Zurück',
    },
    Label: {
      CompleteProfile: 'Profil vervollständigen',
      Welcome: 'Willkommen',
    },
    Step: {
      Button: {
        Organic: 'Ökologisch',
        Conventional: 'Konventionell',
        YesIHaveSome: 'Ja, ich habe welche',
        OnlyPlants: 'Nur Ackerbau',
        Edit: 'Bearbeiten',
        Save: 'Speichern',
      },
      Label: {
        WhereFarmLocated: 'Wo befindet sich Ihr Betrieb?',
        WhichTypeOfFarmingAreYouCurrentlyOperating:
          'Welche Art von Landwirtschaft betreiben Sie derzeit?',
        YouCanChangeThisLater:
          'Sie können dies später in Ihren Kontoeinstellungen ändern',
        WhatYouLikeToCallThisFarm: 'Wie möchten Sie diesen Betrieb nennen?',
        HowBigIsYourFarm: 'Wie groß ist Ihr Betrieb?',
        Hectare: 'ha',
        DoYouHaveAnimals: 'Haben Sie Tiere?',
        WhichTypeOfAnimals: 'Welche Art von Tieren?',
        WhatIsYourRoughageConsumingLivestockUnit:
          'Wie viele RGV (Rauhfutterfreßende Großvieheinheit) geören zu ihrem Betrieb?',
        PickAtLeastOne: 'Wählen Sie mindestens eine Option',
        ReviewYourFarmDetails: 'Überprüfen Sie Ihre Betriebsdetails',
        HectarePlaceholder: 'Größe eingeben',
        Location: 'Standort',
        FarmingType: 'Betriebsart',
        FarmSize: 'Betriebsgröße',
        Animals: 'Tiere',
        FarmName: 'Betriebsname',
        UpdateFarmDetails: 'Betriebsdetails aktualisieren',
        NotSpecified: 'Nicht angegeben',
        HasAnimalsLiveStockUnit:
          'Hat Tiere: {{animalTypes}}, Großvieheinheit: {{livestockUnit}}',
        NoAnimals: 'Keine Tiere',
      },
      Placeholder: {
        EnterPostcodeState:
          'Geben Sie Ihre Postleitzahl oder Ihr Bundesland ein',
        SelectFarmingType: 'Wählen Sie die Betriebsart',
        EnterFarmName: 'Geben Sie Ihren Betriebsnamen ein',
      },
      Options: {
        Cows: 'Kühe',
        Poultry: 'Geflügel',
        Pigs: 'Schweine',
        Sheep: 'Schafe',
        Goats: 'Ziegen',
        Others: 'Andere',
      },
    },
  },
  Browse: {
    Button: {
      ResetFilters: 'Filter zurücksetzen',
      SuggestUpdates: 'Aktualisierungen vorschlagen',
      Newest: 'Neueste',
      Oldest: 'Älteste',
      HighestValue: 'Höchster Wert',
      LowestValue: 'Niedrigster Wert',
      HighestEffort: 'Höchster Aufwand',
      LowestEffort: 'Niedrigster Aufwand',
      ShortestDuration: 'Kürzeste Dauer',
      LongestDuration: 'Längste Dauer',
      CopiedToClipboard: 'E-Mail-Adresse in die Zwischenablage kopiert',
    },
    Label: {
      Location: 'Standort',
      ErrorLoadingMeasures:
        'Fehler beim Laden der Maßnahme {{uri}}. Bitte wenden Sie sich an info@naturwirt.org',
      Created: 'Erstellt: {{- dateCreated}}',
      LastUpdated: 'Zuletzt aktualisiert: {{- dateUpdated}}',
      NoDate: 'Kein verfügbares datum',
      AvailableMeasures: 'Verfügbare Maßnahmen',
      ApplicableArea: 'gültiges Bundesland oder Kreis',
      Loading: 'Laden...',
      SortBy: 'Sortieren nach',
      Duration: 'Dauer',
      Setting: 'Landnutzung',
      Situation: 'Lage',
      Renewable: 'Nur Folgeanträge',
      WhatsInvolved: 'Was muss ich beachten ?',
      MaximumOperation: 'Maximale Fläche pro Betrieb',
      MaximumArea: 'Max. Hektar pro Fläche',
      MinimumArea: 'Min. Hektar pro Fläche',
      Form: 'Form',
      KeyBenefits: 'Vorteile & Nutzen',
      KeyDatesActivities: 'Wichtige Termine',
      Supplements: 'Zuschläge',
      Contact: 'Kontakt',
      Complete: 'Abgeschlossen',
      Archived: 'Archiviert',
      Unarchive: 'Aus Archiv holen',
      ApplyBy: 'Bewerben bis',
      TotalAmount: 'Gesamtbetrag',
      CombinationSurcharges:
        'Maßnahmen sind nur bedingt miteinander kombinierbar',
      ReadMore: 'Hier mehr lesen',
      Apply: 'Bewerben',
      PrivateNote: 'Private Notiz hinzufügen...',
      NoExactMatches: 'Keine exakten Treffer',
      TryChangingOrRemovingSomeOfYourFilters:
        'Versuchen Sie, einige Ihrer Filter zu ändern oder zu entfernen.',
      NoResultsInYourArea: 'Keine Ergebnisse in Ihrem Gebiet',
      NoMeasuresAvailableOnThePlatformYet:
        'Für Ihr Gebiet sind derzeit keine Maßnahmen auf der Plattform verfügbar.',
      Step: {
        Count_one: '{{count}} Schritt',
        Count_other: '{{count}} Schritte',
      },
    },
    EffortRating: {
      Effort: 'Aufwand',
      Low: 'Niedrig',
      Medium: 'Mittel',
      High: 'Hoch',
    },
    EffortRatingCard: {
      LowEffort: 'Niedriger Aufwand',
      LowEffortDescription:
        'Diese Bewertung basiert auf Expertenmeinungen und der Erfahrung von Landwirten, die diese Plattform nutzen. Geben Sie jetzt Ihre eigene Einschätzung ab, um die Bewertung der Maßnahme zu verbessern.',
      SuggestNewRating: 'Neue Bewertung vorschlagen',
      MediumEffort: 'Mittlerer Aufwand',
      MediumEffortDescription:
        'Diese Bewertung basiert auf Expertenmeinungen und der Erfahrung von Landwirten, die diese Plattform nutzen. Sie deutet auf einen moderaten Aufwand hin. Geben Sie jetzt Ihre eigene Einschätzung ab, um die Bewertung der Maßnahme zu verbessern.',
      HighEffort: 'Hoher Aufwand',
      HighEffortDescription:
        'Diese Bewertung basiert auf Expertenmeinungen und der Erfahrung von Landwirten, die diese Plattform nutzen. Sie bedeutet einen hohen Aufwand. Geben Sie jetzt Ihre eigene Einschätzung ab, um die Bewertung der Maßnahme zu verbessern.',
    },
  },
  FiltersBar: {
    Buttons: {
      DeselectAll: 'Alle abwählen',
      SelectAll: 'Alle auswählen',
      Apply: 'Anwenden',
      ApplyFilters: 'Filter anwenden',
      Reset: 'Zurücksetzen',
      Value: 'Wert',
      Effort: 'Aufwand',
      Low: 'Niedrig',
      Medium: 'Mittel',
      High: 'Hoch',
      TypeOfFarming: 'Art der Landwirtschaft',
      Any: 'Beliebig',
      Conventional: 'Konventionell',
      Organic: 'Ökologisch',
      LandSetting: 'Landnutzung',
      ArableLand: 'Ackerland',
      Grassland: 'Grünland',
      Bog: 'Moor',
      Woodland: 'Wald',
      Special: 'Sonderkulturen',
      Other: 'Sonstiges',
      Rotating: 'Rotierend',
      WholeFarm: 'Gesamter Betrieb',
      Fixed: 'Lagegenau',
      AUKM: 'AUKM',
      ÖR: 'ÖR',
      Private: 'Privat',
      VNS: 'VNS',
      MoreFilters: 'Weitere Filter',
      Close: 'Schließen',
      Clear: 'Zurücksetzen',
      RemoveFilter: 'Filter {{- filter}} entfernen',
      ValueRange: '', // intentionally left blank, according to translation spreadsheet
      ConventionalFarming: '"Konventionel"',
      OrganicFarming: '"Ökologisch"',
    },
    Labels: {
      AllFilters: 'Mehr Filter',
      Value: 'Wert',
      ValueDescription:
        'Der Wert kann variieren, je nachdem ob Sie biologisch oder konventionell wirtschaften, und abhängig von anderen Zuschlägen, die Sie möglicherweise hinzufügen.',
      MinimumValue: 'Minimum',
      MaximumValue: 'Maximum',
      Effort: 'Aufwand',
      EffortDescription:
        'Diese Bewertung basiert auf Expertenmeinungen und den Erfahrungen von Landwirten auf dieser Plattform. Sie können Ihre eigene Einschätzung auf den einzelnen Maßnahmenseiten abgeben, um unsere Bewertung der Maßnahme zu verbessern.',
      TypeOfFarming: 'Art der Landwirtschaft',
      LandSetting: 'Landnutzung',
      LandSituation: 'Lage',
      SubsidyProvider: 'Förderanbieter',
      EffortLowercase: 'aufwand',
      And: 'und',
      Only: 'nur',
    },
  },
  AccessRestricted: {
    Message: {
      CheckingAccess: 'Überprüfe Ihren Zugang',
      AccessRestricted: 'Zugriff eingeschränkt',
      NoPrivileges:
        'Entschuldigung, es scheint, dass Sie nicht die erforderlichen Berechtigungen haben. Wenn Sie glauben, dass dies ein Fehler ist',
      LoggedInAs: 'Sie sind angemeldet als {{email}} -',
    },
    Button: {
      SignOut: 'Abmelden',
      ReachOut: 'Kontaktieren Sie uns',
      SignIn: 'Anmelden',
    },
  },
  User: {
    Toast: {
      UpdateSuccessTitle: 'Benutzer erfolgreich aktualisiert!',
      UpdateSuccessDescription: 'Der Benutzer wurde aktualisiert.',
      UpdateErrorTitle: 'Fehler beim Aktualisieren des Benutzers',
      UpdateErrorDescription:
        'Beim Aktualisieren des Benutzers ist ein Fehler aufgetreten.',
    },
    TableHeader: {
      ID: 'ID',
      Name: 'Name',
      Email: 'E-Mail',
      Actions: 'Aktionen',
      Notifications: 'Benachrichtigungen',
    },
    Button: {
      OpenMenu: 'Menü öffnen',
      Edit: 'Bearbeiten',
      Save: 'Speichern',
      EditUser: 'Benutzer bearbeiten',
    },
    Dialog: {
      EditUserTitle: 'Benutzer bearbeiten',
    },
    DefaultName: 'Unbekannt',
    InputLabel: {
      Name: 'Name',
    },
  },
  ForgotPassword: {
    Button: {
      SignIn: 'Zurück zur Anmeldung',
    },
    Label: {
      EmailAddress: 'E-Mail-Adresse',
      Title: 'Passwort vergessen?',
      Body: 'Geben Sie Ihre E-Mail-Adresse ein und wir senden Ihnen einen Link zum Zurücksetzen Ihres Passworts.',
      Success:
        'Wenn Ihre E-Mail-Adresse in unserem System existiert, erhalten Sie in Kürze einen Link zum Zurücksetzen des Passworts.',
    },
    Toast: {
      Success:
        'Wenn Ihre E-Mail-Adresse in unserem System existiert, wurde eine E-Mail zum Zurücksetzen des Passworts gesendet.',
      Error: 'Ein Fehler ist aufgetreten.',
    },
  },
  AuthModal: {
    Button: {
      SignUp: 'Registrieren',
      LogIn: 'Anmelden',
      ForgotYourPassword: 'Passwort vergessen?',
    },
    Label: {
      WelcomeToForderassistent: 'Willkommen bei Naturwirt',
      EmailPlaceholder: 'name@example.com',
      Email: 'E-Mail',
      CreateAPasswordPlaceholder: 'Passwort erstellen',
      Password: 'Passwort',
      ConfirmPassword: 'Passwort bestätigen',
      IAgreeToForderassistent: 'Ich stimme Naturwirt zu',
      And: 'und',
      TermsOfUse: 'Nutzungsbedingungen',
      PrivacyPolicy: 'Datenschutzrichtlinie',
      EnterYourPassword: 'Geben Sie Ihr Passwort ein',
    },
  },
  DeleteAccountModal: {
    Button: {
      PermanentlyDeleteAccount: 'Konto dauerhaft löschen',
      Cancel: 'Abbrechen',
    },
    Label: {
      AreYouSureYouWantToDeleteYourAccount:
        'Sind Sie sicher, dass Sie Ihr Konto löschen möchten?',
      ThisActionCannotBeUndone:
        'Diese Aktion kann nicht rückgängig gemacht werden. Dadurch wird Ihr gesamtes Konto dauerhaft gelöscht und alle Ihre Maßnahmen werden gelöscht.',
      TypeInYourEmail: 'Geben Sie Ihre E-Mail ein',
      ToConfirm: 'zu bestätigen.',
      EnterEmail: 'E-Mail eingeben',
      AnErrorOccurredPleaseTryAgain:
        'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
      EmailConfirmationDoesNotMatch:
        'Die E-Mail-Bestätigung stimmt nicht überein',
    },
  },
  DeleteMeasureModal: {
    Button: {
      Cancel: 'Abbrechen',
      PermanentlyDeleteMeasure: 'Maßnahme dauerhaft löschen',
    },
    Label: {
      AreYouSureYouWantToDeleteThisMeasure:
        'Möchten Sie diese Maßnahme wirklich löschen?',
      ThisActionCannotBeUndone:
        'Diese Aktion kann nicht rückgängig gemacht werden. Dadurch wird die Maßnahme dauerhaft gelöscht.',
      MeasureDeletedSuccessfully: 'Maßnahme erfolgreich gelöscht',
      AnErrorOccuredPleaseTryAgain:
        'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
    },
  },
  Validator: {
    index: {
      Label: {
        PasswordMustBeAtLeast8Characters:
          'Das Passwort muss mindestens 8 Zeichen lang sein',
        Required: 'Erforderlich',
        PasswordsDoNotMatch: 'Die Passwörter stimmen nicht überein',
        MeasureIdentifierRequired: 'Maßnahmenkennung ist erforderlich',
        ProgramTitleFormat:
          'Der Programmtitel muss das Format "ABC - DEF" haben',
        MeasureTitleLongRequired: 'Maßnahmentitel (lang) ist erforderlich',
        MeasureTitleShortRequired: 'Maßnahmentitel (kurz) ist erforderlich',
        PublicationDateRequired:
          'Das Veröffentlichungsdatum muss ein gültiges Datum sein',
        PublicationSourceRequired: 'Veröffentlichungsquelle ist erforderlich',
        ApplicationDateRequired:
          'Das Antragsdatum muss ein gültiges Datum sein',
        ApplicableAreaNotEmpty:
          'Der anwendbare Bereich darf nicht leer sein, wenn angegeben',
        ConventionalSubsidyPositiveInteger:
          'Die konventionelle Subvention muss eine positive ganze Zahl sein',
        OrganicSubsidyPositiveInteger:
          'Die Bio-Subvention muss eine positive ganze Zahl sein',
        InvalidEmail: 'Ungültige E-Mail-Adresse',
        InvalidPhoneNumber: 'Ungültige Telefonnummer',
        InvalidEffortValue:
          'Ungültiger Aufwandswert. Muss Hoch, Mittel oder Niedrig sein',
        EffortTooltipNotEmpty:
          'Aufwands-Tooltip darf nicht leer sein, wenn angegeben',
        DurationPositiveInteger: 'Die Dauer muss eine positive ganze Zahl sein',
        DurationTooltipNotEmpty:
          'Dauer-Tooltip darf nicht leer sein, wenn angegeben',
        InvalidSettingValue:
          'Ungültiger Einstellungswert. Muss Ackerland, Grünland, Keine Angabe oder Sonstiges sein',
        SettingTooltipNotEmpty:
          'Einstellungs-Tooltip darf nicht leer sein, wenn angegeben',
        SituationInvalid:
          'Ungültiger Situationswert. Muss Wechselnd, Gesamtbetrieb oder Fest sein',
        SituationTooltipNotEmpty:
          'Situations-Tooltip darf nicht leer sein, wenn angegeben',
        WhatsInvolvedNotEmpty:
          'Zusammenfassung darf nicht leer sein, wenn angegeben',
        CultivationConditionsNotEmpty:
          'Anbaubedingungen dürfen nicht leer sein, wenn angegeben',
        CombinationsDescriptionNotEmpty:
          'Kombinationsbeschreibung darf nicht leer sein, wenn angegeben',
        AtleastOneApplicationStep:
          'Es muss mindestens einen Antragsschritt geben',
        ApplicationDescriptionNotEmpty:
          'Antragsbeschreibung darf nicht leer sein, wenn angegeben',
        AvailableCombinationNotEmpty:
          'Verfügbare Kombination darf nicht leer sein, wenn angegeben',
        TotalAmountPositiveInteger:
          'Der Gesamtbetrag muss eine positive ganze Zahl sein',
        SubidyValueAtleastOne:
          'Mindestens ein Förderwert muss angegeben werden',
        KeyBenefitsNotEmpty: 'Darf nicht leer sein',
      },
    },
    Auth: {
      Label: {
        PasswordDontMatch: 'Die Passwörter stimmen nicht überein',
      },
    },
  },
  NotFound: {
    Button: {
      ReturnHome: 'Zurück zur Startseite',
    },
    Label: {
      NotFound: 'Nicht gefunden (404)',
      SorryWeCantSeemToFindThePageYoureLookingFor:
        'Entschuldigung, wir können die von Ihnen gesuchte Seite nicht finden',
      IfYouBelieveThisIsAnError: 'Wenn Sie glauben, dass dies ein Fehler ist,',
      ReachOutToUs: 'kontaktieren Sie uns.',
      NoItems: 'Keine relevanten Einschränkungen.',
      NoKeyDates: 'Keine relevanten Fristen',
      NoContactInformation: 'Keine Kontaktdaten verfügbar',
    },
  },
  Admin: {
    Navbar: {
      Measures: 'Maßnahmen',
      Users: 'Benutzer',
      CreateMeasure: 'Maßnahme erstellen',
      SignOut: 'Abmelden',
    },
    Version: 'Version',
  },
  UI: {
    Table: {
      RowsDefaultName: 'Zeilen',
      TableDefaultName: 'Tabelle',
      Showing: 'Anzeigen',
      DownloadCSV: 'CSV herunterladen',
      Columns: 'Spalten',
      NoResults: 'Keine Ergebnisse',
      Page: 'Seite',
      PageSize: 'Seitengröße',
      Search: 'Suchen',
      Yes: 'Ja',
      No: 'Nein',
    },
    Toast: {
      Error: 'Ein Fehler ist aufgetreten.',
    },
  },
}

export default de
