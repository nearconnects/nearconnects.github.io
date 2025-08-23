/**
 * NEAR - Internationalization (i18n)
 * Language switching functionality and translations
 */

// Translations object containing all text content in both languages
const translations = {
    es: {
        // Navigation
        'nav.home': 'Inicio',
        'nav.green-deliveries': 'Green Deliveries',
        'nav.about': 'About Us',
        'nav.blog': 'Blog',
        'nav.data-insights': 'Data Insights',
        'nav.sign-in': 'Sign In',
        'nav.get-started': 'Get Started',

        // Hero Section
        'hero.tagline.top': 'NEVER EMPTY AGAIN',
        'hero.tagline.bottom': 'ON RETURN',
        'hero.subtitle': 'Reduciendo viajes vacíos y emisiones mientras permitimos entregas accesibles',
        'hero.button.discover': 'Descubre Cómo Funciona',

        // From The Fields Section
        'fields.tag': 'NEVER EMPTY',
        'fields.title': 'En el transporte, la excelencia operacional nace donde las cosas realmente suceden:',
        'fields.description1': 'Con conductores, freelancers, operadores y gerentes logísticos. En carretera, en almacenes, en cada entrega.',
        'fields.description2': 'NEAR pone una plataforma inteligente y fácil de usar en sus manos, ayudándoles a optimizar rutas, llenar kilómetros vacíos y conectar directamente con clientes.',
        'fields.description3': 'Todo desde su teléfono — con geolocalización, pagos integrados y soporte en tiempo real.',
        'fields.description4': 'Convertimos regresos en oportunidades. Y cada kilómetro en impacto positivo.',

        // Technology Section
        'tech.tag': 'TECNOLOGÍA',
        'tech.title': 'NEAR es la nueva generación de organización logística.',
        'tech.description1': 'Nuestra app está construida sobre un Sistema Operativo de Transporte diseñado a medida, diseñado para reducir viajes vacíos, reducir costos y maximizar la capacidad de carga en cada ruta.',
        'tech.description2': 'Con inteligencia artificial, seguimiento en tiempo real y algoritmos de retorno, NEAR garantiza eficiencia, equidad y sostenibilidad en cada operación.',
        'tech.description3': 'Estamos estableciendo un nuevo estándar para la colaboración entre transportistas y remitentes — un estándar donde todos ganan.',

        // Stats Section
        'stats.title': 'OTLE Data Insights: Entendiendo la Eficiencia del Transporte y el Impacto Ambiental',
        'stats.tons.label': 'Toneladas anuales movidas en comercio de desplazamiento interno en España',
        'stats.operations.label': 'Número anual de operaciones vacías',
        'stats.emissions.label': 'Emisiones anuales de CO₂ de estos desplazamientos',

        // Problem/Solution Section
        'solution.title': 'Problema y Solución',
        'problem.title': 'El Problema',
        'problem.description': 'El 43% de las rutas logísticas en España operan vacías, causando:',
        'problem.item1': 'Pérdidas operacionales significativas',
        'problem.item2': 'Costos innecesarios de combustible',
        'problem.item3': 'Desgaste de vehículos',
        'problem.item4': 'Emisiones evitables de CO₂',
        'solution.our-title': 'Nuestra Solución',
        'solution.description': 'Plataforma inteligente que:',
        'solution.item1': 'Conecta oferta y demanda logística',
        'solution.item2': 'Optimiza rutas existentes',
        'solution.item3': 'Reduce costos operacionales',
        'solution.item4': 'Genera ingresos adicionales',

        // Benefits Section
        'benefits.title': 'Beneficios del Transporte',
        'benefits.carriers.title': 'Transportistas y Conductores',
        'benefits.carriers.description': 'Maximiza tus ganancias y eficiencia con nuestra plataforma',
        'benefits.carriers.item1': 'Cargas en rutas de retorno',
        'benefits.carriers.item2': 'Reducción de kilómetros vacíos',
        'benefits.carriers.item3': 'Ingresos adicionales',
        'benefits.carriers.item4': 'Optimización de rutas',
        'benefits.shippers.title': 'Remitentes y Empresas',
        'benefits.shippers.description': 'Reduce tus costos y simplifica tus operaciones logísticas',
        'benefits.shippers.item1': 'Envíos económicos',
        'benefits.shippers.item2': 'Gestión simplificada',
        'benefits.shippers.item3': 'Seguimiento en tiempo real',
        'benefits.shippers.item4': 'Costos reducidos',
        'benefits.environment.title': 'Impacto Ambiental',
        'benefits.environment.description': 'Contribuye a un futuro más sostenible con cada envío',
        'benefits.environment.item1': 'Reducción de emisiones de CO₂',
        'benefits.environment.item2': 'Optimización de recursos',
        'benefits.environment.item3': 'Menor huella de carbono',
        'benefits.environment.item4': 'Prácticas sostenibles',

        // Impact Section
        'impact.title': 'Nuestro Impacto',
        'impact.emissions.title': 'Emisiones de CO₂ Evitadas',
        'impact.emissions.unit': 'toneladas',
        'impact.kilometers.title': 'Kilómetros Vacíos Eliminados',
        'impact.kilometers.unit': 'km',
        'impact.revenue.title': 'Ingresos Adicionales Generados',
        'impact.revenue.unit': '€',

        // Contact Section
        'contact.title': 'Contáctanos',
        'contact.question': '¿Tienes una pregunta?',
        'contact.description': 'Contáctanos y te responderemos lo antes posible.',
        'contact.form.name': 'Nombre',
        'contact.form.email': 'Email',
        'contact.form.type': '¿Eres remitente o transportista?',
        'contact.form.type.select': 'Selecciona una opción',
        'contact.form.type.shipper': 'Remitente',
        'contact.form.type.carrier': 'Transportista',
        'contact.form.type.other': 'Otro',
        'contact.form.message': 'Mensaje',
        'contact.form.submit': 'Enviar Mensaje',
        'contact.form.success': '¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.',

        // Footer
        'footer.tagline': 'Cuidando el planeta, conectando caminos 🌱',
        'footer.company': 'Empresa',
        'footer.company.about': 'About Us',
        'footer.company.team': 'Equipo',
        'footer.company.careers': 'Carreras',
        'footer.company.press': 'Prensa',
        'footer.legal': 'Legal',
        'footer.legal.privacy': 'Política de Privacidad',
        'footer.legal.terms': 'Términos y Condiciones',
        'footer.legal.cookies': 'Política de Cookies',
        'footer.help': 'Ayuda',
        'footer.help.faq': 'FAQ',
        'footer.help.contact': 'Contacto',
        'footer.help.support': 'Soporte',
        'footer.social': 'Síguenos',
        'footer.copyright': '&copy; 2025 NEAR (Never Empty Again on Return). Todos los derechos reservados.'
    },

    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.green-deliveries': 'Green Deliveries',
        'nav.about': 'About Us',
        'nav.blog': 'Blog',
        'nav.data-insights': 'Data Insights',
        'nav.sign-in': 'Sign In',
        'nav.get-started': 'Get Started',

        // Hero Section
        'hero.tagline.top': 'NEVER EMPTY AGAIN',
        'hero.tagline.bottom': 'ON RETURN',
        'hero.subtitle': 'Reducing empty trips and emissions while enabling accessible deliveries',
        'hero.button.discover': 'Discover How It Works',

        // From The Fields Section
        'fields.tag': 'NEVER EMPTY',
        'fields.title': 'In transportation, operational excellence is born where things truly happen:',
        'fields.description1': 'With drivers, freelancers, operators, and logistics managers. On the road, in warehouses, at every delivery.',
        'fields.description2': 'NEAR puts a smart and user-friendly platform in their hands, helping them optimize routes, fill empty miles, and connect directly with customers.',
        'fields.description3': 'All from their phone — with geolocation, integrated payments, and real-time support.',
        'fields.description4': 'We turn returns into opportunities. And every kilometer into positive impact.',

        // Technology Section
        'tech.tag': 'TECHNOLOGY',
        'tech.title': 'NEAR is the next generation of logistics organization.',
        'tech.description1': 'Our app is built on a custom-designed Transport Operating System, engineered to reduce empty trips, cut costs, and maximize cargo capacity on every route.',
        'tech.description2': 'With artificial intelligence, real-time tracking, and backhaul algorithms, NEAR ensures efficiency, fairness, and sustainability in every operation.',
        'tech.description3': 'We\'re setting a new standard for collaboration between carriers and senders — a standard where everyone wins.',

        // Stats Section
        'stats.title': 'OTLE Data Insights: Understanding Transport Efficiency and Environmental Impact',
        'stats.tons.label': 'Annual tons moved in internal displacement commerce in Spain',
        'stats.operations.label': 'Annual number of empty operations',
        'stats.emissions.label': 'Annual CO₂ emissions from these displacements',

        // Problem/Solution Section
        'solution.title': 'Problem and Solution',
        'problem.title': 'The Problem',
        'problem.description': '43% of logistics routes in Spain operate empty, causing:',
        'problem.item1': 'Significant operational losses',
        'problem.item2': 'Unnecessary fuel costs',
        'problem.item3': 'Vehicle wear and tear',
        'problem.item4': 'Avoidable CO₂ emissions',
        'solution.our-title': 'Our Solution',
        'solution.description': 'Intelligent platform that:',
        'solution.item1': 'Connects logistics supply and demand',
        'solution.item2': 'Optimizes existing routes',
        'solution.item3': 'Reduces operational costs',
        'solution.item4': 'Generates additional income',

        // Benefits Section
        'benefits.title': 'Transportation Benefits',
        'benefits.carriers.title': 'Carriers and Drivers',
        'benefits.carriers.description': 'Maximize your earnings and efficiency with our platform',
        'benefits.carriers.item1': 'Loads on return routes',
        'benefits.carriers.item2': 'Reduction of empty kilometers',
        'benefits.carriers.item3': 'Additional revenue',
        'benefits.carriers.item4': 'Route optimization',
        'benefits.shippers.title': 'Shippers and Businesses',
        'benefits.shippers.description': 'Reduce your costs and simplify your logistics operations',
        'benefits.shippers.item1': 'Economic shipments',
        'benefits.shippers.item2': 'Simplified management',
        'benefits.shippers.item3': 'Real-time tracking',
        'benefits.shippers.item4': 'Reduced costs',
        'benefits.environment.title': 'Environmental Impact',
        'benefits.environment.description': 'Contribute to a more sustainable future with each shipment',
        'benefits.environment.item1': 'Reduction of CO₂ emissions',
        'benefits.environment.item2': 'Resource optimization',
        'benefits.environment.item3': 'Lower carbon footprint',
        'benefits.environment.item4': 'Sustainable practices',

        // Impact Section
        'impact.title': 'Our Impact',
        'impact.emissions.title': 'CO₂ Emissions Avoided',
        'impact.emissions.unit': 'tons',
        'impact.kilometers.title': 'Empty Kilometers Eliminated',
        'impact.kilometers.unit': 'km',
        'impact.revenue.title': 'Additional Revenue Generated',
        'impact.revenue.unit': '€',

        // Contact Section
        'contact.title': 'Contact Us',
        'contact.question': 'Have a question?',
        'contact.description': 'Contact us and we\'ll get back to you as soon as possible.',
        'contact.form.name': 'Name',
        'contact.form.email': 'Email',
        'contact.form.type': 'Are you a shipper or carrier?',
        'contact.form.type.select': 'Select an option',
        'contact.form.type.shipper': 'Shipper',
        'contact.form.type.carrier': 'Carrier',
        'contact.form.type.other': 'Other',
        'contact.form.message': 'Message',
        'contact.form.submit': 'Send Message',
        'contact.form.success': 'Message sent successfully! We\'ll be in touch soon.',

        // Footer
        'footer.tagline': 'Caring for the planet, connecting paths 🌱',
        'footer.company': 'Company',
        'footer.company.about': 'About Us',
        'footer.company.team': 'Team',
        'footer.company.careers': 'Careers',
        'footer.company.press': 'Press',
        'footer.legal': 'Legal',
        'footer.legal.privacy': 'Privacy Policy',
        'footer.legal.terms': 'Terms & Conditions',
        'footer.legal.cookies': 'Cookie Policy',
        'footer.help': 'Help',
        'footer.help.faq': 'FAQ',
        'footer.help.contact': 'Contact',
        'footer.help.support': 'Support',
        'footer.social': 'Follow Us',
        'footer.copyright': '&copy; 2025 NEAR (Never Empty Again on Return). All rights reserved.'
    }
};

// i18n functionality
class I18n {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'es';
        this.init();
    }

    init() {
        this.updateLanguageSelector();
        this.attachEventListeners();
        this.translatePage();
        this.updateDocumentLanguage();
    }

    updateLanguageSelector() {
        const selector = document.querySelector('.language-selector select');
        if (selector) {
            selector.value = this.currentLanguage;
        }
    }

    attachEventListeners() {
        const selector = document.querySelector('.language-selector select');
        if (selector) {
            selector.addEventListener('change', (e) => {
                this.changeLanguage(e.target.value);
            });
        }
    }

    changeLanguage(language) {
        if (language === this.currentLanguage) return;
        
        this.currentLanguage = language;
        localStorage.setItem('language', language);
        this.translatePage();
        this.updateDocumentLanguage();
    }

    translatePage() {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.getTranslation(key);
            
            if (translation) {
                // Handle different types of content
                if (element.tagName === 'INPUT' && element.type === 'submit') {
                    element.value = translation;
                } else if (element.tagName === 'INPUT' && (element.type === 'text' || element.type === 'email')) {
                    element.placeholder = translation;
                } else if (element.hasAttribute('placeholder')) {
                    element.placeholder = translation;
                } else {
                    element.innerHTML = translation;
                }
            }
        });
    }

    updateDocumentLanguage() {
        document.documentElement.lang = this.currentLanguage;
    }

    getTranslation(key) {
        return translations[this.currentLanguage] && translations[this.currentLanguage][key];
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }
}

// Initialize i18n when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.i18n = new I18n();
});