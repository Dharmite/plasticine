const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resourceSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "therapist"
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  subCategory: {
    type: String
  },
  // categoryList: [
  //   { Percepção: ["Visual", "Auditiva", "Espacial", "Contrastes", "Temporal"] },
  //   {
  //     Motricidade: [
  //       "Esquema Corporal",
  //       "Coordenação óculo-manual",
  //       "Coordenação grafo-manual (pré-escrita)",
  //       "Precisão Manual"
  //     ]
  //   },
  //   {
  //     "Desenvolvimento Verbal": [
  //       "Compreensão Verbal",
  //       "Raciocínio Verbal",
  //       "Consciência Fonológica",
  //       "Segmentação Silábica e fonológica",
  //       "Fluência Verbal",
  //       "Leitura",
  //       "Escrita"
  //     ]
  //   },
  //   {
  //     Memória: [
  //       "Auditiva",
  //       "Visual",
  //       "Verbal e Numérica Repetitiva",
  //       "Verbal e Numérica Significativa"
  //     ]
  //   },
  //   {
  //     "Áreas Numéricas": [
  //       "Conceitos Numéricos Básicos",
  //       "Cálculo",
  //       "Raciocínio Abstrato"
  //     ]
  //   },
  //   {
  //     "Desenvolvimento Emocional-Social": [
  //       "Área Emocional-Afetiva",
  //       "Área Social"
  //     ]
  //   },
  //   {
  //     "AVD's": [
  //       "Autonomia",
  //       "Rotinas",
  //       {
  //         Lugares: [
  //           "Escola",
  //           "Supermercado",
  //           "Cabeleireiro",
  //           "Centro Comercial",
  //           "Parque Infantil",
  //           "Livraria",
  //           "Loja de Roupa",
  //           "Hospital / Centro Médico"
  //         ]
  //       }
  //     ]
  //   }
  // ],
  observation: {
    type: String,
    required: true
  },
  feedback: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "therapist"
      },
      observation: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],

  files: [
    {
      filename: {
        type: String
      },

      destination: {
        type: String
      },
      src: {
        type: String
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Resource = mongoose.model("resource", resourceSchema);
