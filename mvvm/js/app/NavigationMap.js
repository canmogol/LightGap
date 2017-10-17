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
    }
};