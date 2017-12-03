/**
 * @viewModel 'ViewModel' as in MVVM (Model-View-ViewModel) pattern, handles bidirectional binding
 * Application View Model
 * @extends ViewModel
 * @class {ApplicationViewModel} ApplicationViewModel
 */
function ApplicationViewModel() {

    //
    // Private and public field declarations
    //

    //
    // Private and public method declarations
    //

    //
    // i18n, bindings, actions and views
    //

    //
    // constructor
    //
    (function (self) {

        // extends ViewModel class, 'self' is the constructor parameter of ViewModel, i.e. 'new ViewModel(self)'
        self.extend(ViewModel, self, 1, 2, 3);

    })(this);

}
