import EntryLayout from "../components/layouts/EntryLayout";
import Button from "../components/ui/button/Button";
import AddChildModal from "../components/adult/AddChildModal";
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
    <EntryLayout>
      {isModalOpen && (
        <AddChildModal isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
      <Button onClick={handleAddChild}>Add a new child user +</Button>
    </EntryLayout>
  );
};

export default ChildAccountsPage;
