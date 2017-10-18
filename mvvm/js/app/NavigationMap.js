/**
 * application navigation map, should define initial key.
 * @type {NavigationMap}
 */
NavigationMap = {
    initial: 'main',
    login: {
        template: 'html/login/login.html',
        controller: LoginController,
        viewModel: LoginViewModel
    },
    main: {
        template: 'html/main/main.html',
        controller: null,
        viewModel: null
    },
    products: {
        template: 'html/products/products.html',
        controller: null,
        viewModel: null
    },
    categories: {
        template: 'html/categories/categories.html',
        controller: null,
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