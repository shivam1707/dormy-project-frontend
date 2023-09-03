import clsx from "clsx";

export default function Cinema({ occupied, selectedSeats, onSelectedSeatsChange,rows }) {
  console.log("cinema",occupied)
  const seats = Array.from({ length: 8 * rows }, (_, i) => i);
    function handleSelectedState(seat) {    
      const isSelected = selectedSeats.includes(seat);
      if (isSelected) {
        onSelectedSeatsChange(
          selectedSeats.filter((selectedSeat) => selectedSeat !== seat)
        );
      } else {
        onSelectedSeatsChange([...selectedSeats, seat]);
      }
    }
  
    return (
      <div className="Cinema">
        <div className="screen" />
  
        <div className="seats">
          {seats.map((seat) => {
            const isSelected = selectedSeats.includes(seat);
            const isOccupied = occupied.includes(seat);
            return (
              <span
                tabIndex="0"
                key={seat}
                className={clsx(
                  "seat",
                  isSelected && "selected",
                  isOccupied && "occupied"
                )}
                onClick={isOccupied ? null : () => handleSelectedState(seat)}
                onKeyPress={
                  isOccupied
                    ? null
                    : (e) => {
                        if (e.key === "Enter") {
                          handleSelectedState(seat);
                        }
                      }
                }
              />
            );
          })}
        </div>
      </div>
    );
  }