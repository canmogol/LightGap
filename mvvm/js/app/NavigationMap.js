/**
 * Application navigation map, should define initial key which is loaded as the page loads.
 *
 * Each navigation step represented as in MVVM pattern.
 *
 * @type {NavigationMap}
 */
NavigationMap = {
    initial: 'main',
    login: {
        view: 'html/login/login.html',
        model: LoginModel,
        viewModel: LoginViewModel
    },
    main: {
        view: 'html/main/main.html',
        model: null,
        viewModel: null
    },
    products: {
        view: 'html/products/products.html',
        model: null,
        viewModel: null
    },
    categories: {
        view: 'html/categories/categories.html',
        model: null,
        viewModel: null
    },
    navigate: function (mapping) {
        var key = NavigationMap[mapping];
        if (key !== undefined || mapping === 'initial') {
            key = NavigationMap['initial'];
        }
        window.location.href = window.location.href.split('#')[0] + '#' + key;
    }
};