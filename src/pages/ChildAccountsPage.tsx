import Button from "../components/ui/button/Button";
import AddChildModal from "../components/adult/AddChildModal";
import ChildList from "../components/adult/ChildList";
import { useState } from "react";

const ChildAccountsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddChild = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <AddChildModal isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
      <ChildList />
      <Button onClick={handleAddChild}>Add a new child user +</Button>
    </>
  );
};

export default ChildAccountsPage;
