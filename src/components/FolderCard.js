import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import FolderIcon from "../assets/icons/folder-icon";
import { BsTrash } from "react-icons/bs";
import Helper from "../helpers";

export default function FolderCard({ id, name, onClick, onDelete, date }) {
  return (
    <div className="folder-card" onClick={onClick}>
      <div
        className="tf-file-action"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Dropdown>
          <DropdownButton as={ButtonGroup} title={""}>
            <Dropdown.Item
              href="#"
              onClick={async (e) => {
                e.preventDefault();
                await onDelete(id);
              }}
              className="d-inline-flex align-items-center gap-2"
              style={{ color: "var(--text-error)" }}
            >
              <BsTrash />
              Delete
            </Dropdown.Item>
          </DropdownButton>
        </Dropdown>
      </div>
      <div className="tf-file-icon">
        <div className="tf-file-icon-type">
          <FolderIcon />
        </div>
      </div>
      <div className="tf-filename-text">{name}</div>
      <ul className="info">
        <li className="date">{Helper.formatDate(date)}</li>
      </ul>
    </div>
  );
}
