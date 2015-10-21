;(function () {
    angular
        .module('everquizApp')
        .directive('eqModal', eqModal);

        function eqModal() {
            return {
                restrict: 'A',
                link: function(scope, element, attrs){
                    element.on('click', modalToggle);

                    function modalToggle() {
                        var modal = document.getElementById('modal');
                        if (modal.style.opacity == 0) {
                            modal.style.display = 'block';
                            modal.style.opacity = 1;
                        } else {
                            if(element[0].type === 'submit' ) {
                                if (!scope.form.$valid) {
                                    console.log('valid')
                                    var formElements = scope.form.$error.required;
                                    if(formElements.some(ifArrayContainUndefined)) {
                                        return;
                                    };
                                };
                            };
                            modal.style.opacity = 0;
                            modal.style.display = 'none';
                            function ifArrayContainUndefined (el) {
                                return typeof el.$viewValue === 'undefined';
                            }
                        };
                    };
                }
            }
        }
})(); 