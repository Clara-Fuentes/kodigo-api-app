import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Button, Modal, ModalBody, ModalContent, ModalHeader, ModalFooter } from "@heroui/react";
import { getBootcamp, updateBootcamp, deleteBootcamp } from "../../api/bootcamps.service";
import BootcampForm from "../../components/forms/BootcampForm";

export default function BootcampDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [data, setData] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const b = await getBootcamp(id);
      setData(b);
    })();
  }, [id]);

  async function handleEdit(payload) {
    await updateBootcamp(id, payload);
    const b = await getBootcamp(id);
    setData(b);
    setEditOpen(false);
  }

  async function handleDelete() {
    await deleteBootcamp(id);
    setDeleteOpen(false);
    nav("/bootcamps");
  }

  if (!data) return null;

  return (
    <div className="db-wrap">
      <Link to="/bootcamps" className="db-btn" style={{ height: 32, padding: "0 12px" }}>← Volver</Link>

      <Card className="db-panel" style={{ marginTop: 14 }}>
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <div>
              <h2 className="db-title" style={{ fontSize: 32, marginBottom: 6 }}>{data.title}</h2>
              <div className="db-user-email">Área: {data.area} • {data.weeks} semanas {data.isOpen ? "• Inscripciones abiertas" : ""}</div>
            </div>
            <div className="flex gap-2">
              <Button className="db-btn" onPress={() => setEditOpen(true)}>Editar</Button>
              <Button className="db-btn" color="danger" onPress={() => setDeleteOpen(true)}>Eliminar</Button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <p style={{ whiteSpace: "pre-wrap" }}>{data.description || "Sin descripción"}</p>
        </CardBody>
      </Card>

      {/* Editar */}
      <Modal
        isOpen={editOpen}
        onOpenChange={setEditOpen}
        classNames={{ backdrop: "z-[1000]", wrapper: "z-[1001]", base: "z-[1002] bg-[#12131a] border border-white/10" }}
      >
        <ModalContent>
          <ModalHeader>Editar bootcamp</ModalHeader>
          <ModalBody>
            <BootcampForm initial={data} onSubmit={handleEdit} submitText="Guardar cambios" />
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={() => setEditOpen(false)}>Cerrar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Borrar */}
      <Modal
        isOpen={deleteOpen}
        onOpenChange={setDeleteOpen}
        classNames={{ backdrop: "z-[1000]", wrapper: "z-[1001]", base: "z-[1002] bg-[#12131a] border border-white/10" }}
      >
        <ModalContent>
          <ModalHeader>Eliminar bootcamp</ModalHeader>
          <ModalBody>¿Seguro que deseas eliminar “{data.title}”?</ModalBody>
        <ModalFooter>
            <Button variant="light" onPress={() => setDeleteOpen(false)}>Cancelar</Button>
            <Button color="danger" onPress={handleDelete}>Eliminar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
