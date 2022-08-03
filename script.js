        'use strict'

        // THESE 2 CODES ARE FOR RULES SECTION
        document.querySelector(".pop").addEventListener('click', function(){
            document.querySelector(".message").classList.remove("hidden");
            document.querySelector(".mask").classList.remove("hidden");
        });

        document.querySelector(".mask").addEventListener('click', function(){
            document.querySelector(".message").classList.add("hidden");
            document.querySelector(".mask").classList.add("hidden");
        });

        // These 2 functions will show/ hide player 2 controles.
        // This is so cuz when player has to throw dice then player 2 controles will be removed from screen.
        function p1_is_active(){
            document.querySelector(".controles2").classList.add('hidden');
            document.querySelector(".controles1").classList.remove('hidden');
            active_player = 1;
        };

        function p2_is_active(){
            document.querySelector(".controles1").classList.add('hidden');
            document.querySelector(".controles2").classList.remove('hidden');
            active_player = 2;
        };

        // Starting the game and important controles like start and reset...
        let active_player = 0;

        document.querySelector('.start').addEventListener('click', function(){
            if(active_player == 0){
                p1_is_active();
                active_player = 1;
            }
        });
        
        function reset(){
            document.querySelector(".controles1").classList.remove('hidden');
            document.querySelector(".controles2").classList.remove('hidden');
            active_player = 0;
            // document.querySelector('.score1').textContent = 0;
            // document.querySelector('.score2').textContent = 0;
            // document.querySelector('.dice').textContent = 0;
            // document.querySelector('.total').textContent = 0
            let value_nav = document.querySelectorAll('.value');
            value_nav.forEach(element => {
                element.textContent = 0;
            });
            score1 = 0;
            score2 = 0;
        }

        document.querySelector('.reset').addEventListener('click', function(){
            reset();
        });

        // Generating random no for dice and totaling
        let rand = ()=>Math.floor(Math.random()*6) + 1;
        let total = 0, score1 = 0, score2 = 0;

        // Transfer of power
        function transfer_of_power(target){
            if(target === 2) p2_is_active();
            else if(target === 1) p1_is_active();
        }

        // Handling dice toss for both players
        document.querySelector('.get1').addEventListener('click', function(){
            if(active_player == 1){
                let dice = rand();
                total = total + dice;
                if(dice == 1) {
                    total = 0;
                    transfer_of_power(2);
                }
                document.querySelector('.dice').textContent = dice;
                document.querySelector('.total').textContent = total;
            }
        });
        document.querySelector('.get2').addEventListener('click', function(){
            if(active_player == 2){
                let dice = rand();
                total = total + dice;
                if(dice == 1) {
                    total = 0;
                    transfer_of_power(1);
                }
                document.querySelector('.dice').textContent = dice;
                document.querySelector('.total').textContent = total;
            }
        });

        // This section for checking for victory
        function victory(){
            if(active_player == 1) if(score1 >= 50) return 1;
            if(active_player == 2) if(score2 >= 50) return 2;
            return 0;
        }
        function victory_flag(){
            alert(`HURRAH !!! PLAYER ${active_player} WINS...`);
        }
        // Handling transfer of controle for both player and score management
        document.querySelector('.set1').addEventListener('click', function(){
            score1 = score1 + total;
            total = 0;
            if(!victory()) transfer_of_power(2);
            else{
                victory_flag();
                reset();
            }
            document.querySelector('.score1').textContent = score1;
            document.querySelector('.total').textContent = total;
        });
        document.querySelector('.set2').addEventListener('click', function(){
            score2 = score2 + total;
            total = 0;
            if(!victory()) transfer_of_power(1);
            else{
                victory_flag();
                reset();
            }
            document.querySelector('.score2').textContent = score2;
            document.querySelector('.total').textContent = total;
        });

        
