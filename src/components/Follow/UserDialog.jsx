import React from "react";
import FollowList from "./FollowList";
import { FaWindowClose } from "react-icons/fa";
function UserDialog({ text, id }) {
  return (
    <dialog id={id} className="modal ">
      <div className="modal-box ">
        <div className="modal-action ">
          <form method="dialog">
            <button className="btn ">
              <FaWindowClose className="text-xl" />
            </button>
          </form>
        </div>
        <FollowList text={text} />
      </div>
    </dialog>
  );
}

export default UserDialog;
