
export default function Actions() {
    return (
    <div className="actions">
        <div className="actions_inner">
            <div className="action">
                <img src="bonus.png" alt="Бонус" />
                <div className="acton_h">Акция "Приведи друга"</div>
                <div className="action_date">02.01.2024-02.03.2024</div>
                <div className="action_info">500 рублей на игровой счёт</div>
            </div>

            <div className="action">
            <img src="bonus.png" alt="Бонус" />
                <div className="acton_h">Акция "День рождения"</div>
                <div className="action_date">Действует бессрочно</div>
                <div className="action_info">10% на итоговую сумму</div>
            </div>

            <div className="action">
            <img src="bonus.png" alt="Бонус" />
                <div className="acton_h">Акция "Бессонная ночь"</div>
                <div className="action_date">Действует бессрочно</div>
                <div className="action_info">20% на итоговую сумму ночью воскресенье-понедельник</div>
            </div>

            <div className="action">
            <img src="bonus.png" alt="Бонус" />
                <div className="acton_h">Акция "Доброе утро"</div>
                <div className="action_date">Действует бессрочно</div>
                <div className="action_info">10% на итоговую сумму для студентов по будним дням до 12 часов</div>
            </div>
        </div>
    </div>
    );
}